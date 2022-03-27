import { HttpException, Injectable } from '@nestjs/common';

import { DepositService } from '@mr/server/features/deposit';
import { ProductsService, Product } from '@mr/server/features/products';
import { UsersService } from '@mr/server/features/users';

import { BuyProductDto } from './dto/buy-product.dto';

@Injectable()
export class BuyService {
    constructor(
        private depositService: DepositService,
        private productsService: ProductsService,
        private usersService: UsersService,
    ) {}

    // eslint-disable-next-line max-lines-per-function
    async buy({ amount, productId }: BuyProductDto, userId: string) {
        const product = await this.productsService.findOne(productId);
        const buyer = await this.usersService.findOne(userId);
        const seller = await this.usersService.findOne(product.sellerId);
        if (amount > product.amountAvailable)
            throw new HttpException({ message: 'Amount too high.', code: 'invalid-amount' }, 400);

        const totalPrice = product.cost * amount;
        const deposit = await this.depositService.createDeposit(buyer.deposit);
        const totalBalance = deposit.balance;

        if (totalPrice > totalBalance)
            throw new HttpException({ message: 'Insufficient deposit.', code: 'insufficient-deposit' }, 400);

        const newDeposit = deposit.subtract(totalPrice);
        await this.usersService.update(userId, { deposit: newDeposit.coins });
        const newSellerDeposit = await this.depositService.createDeposit(seller.deposit).add(totalPrice);

        await this.usersService.update(seller._id, { deposit: newSellerDeposit.coins });
        await this.productsService.update(productId, { amountAvailable: product.amountAvailable - amount });

        return {
            totalCost: totalPrice,
            change: newDeposit.coins,
            purchasedProducts: this.getPurchasedProducts(product, amount),
        };
    }

    private getPurchasedProducts(product: Product, amount: number) {
        return Array(amount)
            .fill(null)
            .map(() => product);
    }
}

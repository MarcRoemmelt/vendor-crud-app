import { Injectable } from '@nestjs/common';

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
        if (amount > product.amountAvailable) throw new Error('Amount too high.');

        const totalPrice = product.cost * amount;
        const deposit = await this.depositService.createDeposit(buyer.deposit);
        const totalBalance = deposit.balance;

        if (totalPrice > totalBalance) throw new Error('Insufficient deposit.');

        const newDeposit = deposit.subtract(totalPrice);
        await this.usersService.update(userId, { deposit: newDeposit.coins });
        await this.productsService.update(productId, { amountAvailable: product.amountAvailable - amount });

        return {
            totalCost: totalPrice,
            change: newDeposit.toArray(),
            purchasedProducts: this.getPurchasedProducts(product, amount),
        };
    }

    private getPurchasedProducts(product: Product, amount: number) {
        return Array(amount)
            .fill(null)
            .map(() => product);
    }
}

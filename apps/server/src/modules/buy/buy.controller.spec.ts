import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '@mr/server/features/users';
import { ProductsService } from '@mr/server/features/products';

import { BuyController } from './buy.controller';
import { BuyService } from './buy.service';
import { DepositService } from '@mr/server/features/deposit';

describe('DepositController', () => {
    let controller: BuyController;
    let service: BuyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BuyController],
            providers: [BuyService, DepositService, ProductsService, UsersService],
        }).compile();

        controller = module.get<BuyController>(BuyController);
        service = module.get<BuyService>(BuyService);
    });

    describe('deposit', () => {
        it('should return the user ', async () => {
            const response = {
                totalCost: 10,
                change: [],
                purchasedProducts: [],
            };
            const request = {
                user: {
                    _id: 'id',
                },
            };
            jest.spyOn(service, 'buy').mockImplementation(() => Promise.resolve(response));
            expect(
                await controller.buy(request, {
                    productId: 'id',
                    amount: 10,
                }),
            ).toBe(response);
        });
    });
});

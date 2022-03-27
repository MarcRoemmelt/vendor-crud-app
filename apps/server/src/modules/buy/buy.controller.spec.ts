import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User, usersMockRepository, UsersService } from '@mr/server/features/users';
import { Product, productsMockRepository, ProductsService } from '@mr/server/features/products';
import { DepositService } from '@mr/server/features/deposit';

import { BuyController } from './buy.controller';
import { BuyService } from './buy.service';

describe('DepositController', () => {
    let controller: BuyController;
    let service: BuyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BuyController],
            providers: [
                BuyService,
                DepositService,
                ProductsService,
                UsersService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: productsMockRepository,
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: usersMockRepository,
                },
            ],
        }).compile();

        controller = module.get<BuyController>(BuyController);
        service = module.get<BuyService>(BuyService);
    });

    describe('deposit', () => {
        it('should return the user ', async () => {
            const response = {
                totalCost: 10,
                change: {},
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

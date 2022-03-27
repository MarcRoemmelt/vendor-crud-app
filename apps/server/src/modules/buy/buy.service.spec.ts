import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User, usersMockRepository, UsersService } from '@mr/server/features/users';

import { BuyService } from './buy.service';
import { Product, productsMockRepository, ProductsService } from '@mr/server/features/products';
import { DepositService } from '@mr/server/features/deposit';

describe('DepositService', () => {
    let buyService: BuyService;
    let depositService: DepositService;
    let productsService: ProductsService;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
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

        buyService = module.get<BuyService>(BuyService);
        depositService = module.get<DepositService>(DepositService);
        productsService = module.get<ProductsService>(ProductsService);
        usersService = module.get<UsersService>(UsersService);
    });

    describe('deposit', () => {
        it('should return right result', async () => {
            const dummyUser = {
                _id: 'id',
                username: 'username',
                role: 'buyer' as any,
                password: 'passwordHash',
                deposit: {
                    5: 0,
                    10: 10,
                },
                refreshTokens: [],
            };
            const dummyProduct = {
                _id: 'id',
                amountAvailable: 20,
                productName: 'name',
                sellerId: 'sellerId',
                cost: 20,
            };
            jest.spyOn(productsService, 'findOne').mockImplementation(() => Promise.resolve(dummyProduct));
            jest.spyOn(productsService, 'update').mockImplementation(() => Promise.resolve(dummyProduct));
            jest.spyOn(usersService, 'findOne').mockImplementation(() => Promise.resolve(dummyUser));
            jest.spyOn(usersService, 'update').mockImplementation((userId, updates) =>
                Promise.resolve(Object.assign({}, dummyUser, updates)),
            );
            expect(await buyService.buy({ amount: 2, productId: '1' }, dummyUser._id)).toEqual({
                totalCost: 2 * 20,
                change: depositService.createDeposit(dummyUser.deposit).subtract(2 * 20).coins,
                purchasedProducts: [dummyProduct, dummyProduct],
            });
        });

        it('should fail with insufficient funds', async () => {
            const dummyUser = {
                _id: 'id',
                username: 'username',
                role: 'buyer' as any,
                password: 'passwordHash',
                refreshTokens: [],
                deposit: {
                    5: 0,
                    10: 0,
                },
            };
            const dummyProduct = {
                _id: 'id',
                amountAvailable: 20,
                productName: 'name',
                sellerId: 'sellerId',
                cost: 20,
            };
            jest.spyOn(productsService, 'findOne').mockImplementation(() => Promise.resolve(dummyProduct));
            jest.spyOn(productsService, 'update').mockImplementation(() => Promise.resolve(dummyProduct));
            jest.spyOn(usersService, 'findOne').mockImplementation(() => Promise.resolve(dummyUser));
            jest.spyOn(usersService, 'update').mockImplementation((userId, updates) =>
                Promise.resolve(Object.assign({}, dummyUser, updates)),
            );
            await expect(buyService.buy({ amount: 2, productId: '1' }, dummyUser._id)).rejects.toEqual(
                new Error('Insufficient deposit.'),
            );
        });

        it('should fail with insufficient amount', async () => {
            const dummyUser = {
                _id: 'id',
                username: 'username',
                role: 'buyer' as any,
                password: 'passwordHash',
                refreshTokens: [],
                deposit: {
                    5: 0,
                    10: 10,
                },
            };
            const dummyProduct = {
                _id: 'id',
                amountAvailable: 1,
                productName: 'name',
                sellerId: 'sellerId',
                cost: 20,
            };
            jest.spyOn(productsService, 'findOne').mockImplementation(() => Promise.resolve(dummyProduct));
            jest.spyOn(productsService, 'update').mockImplementation(() => Promise.resolve(dummyProduct));
            jest.spyOn(usersService, 'findOne').mockImplementation(() => Promise.resolve(dummyUser));
            jest.spyOn(usersService, 'update').mockImplementation((userId, updates) =>
                Promise.resolve(Object.assign({}, dummyUser, updates)),
            );
            await expect(buyService.buy({ amount: 2, productId: '1' }, dummyUser._id)).rejects.toEqual(
                new Error('Amount too high.'),
            );
        });
    });
});

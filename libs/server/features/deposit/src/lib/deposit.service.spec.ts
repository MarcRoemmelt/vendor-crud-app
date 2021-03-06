import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User, usersMockRepository, UsersService } from '@mr/server/features/users';

import { DepositService } from './deposit.service';

describe('DepositService', () => {
    let depositService: DepositService;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DepositService,
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: usersMockRepository,
                },
            ],
        }).compile();

        depositService = module.get<DepositService>(DepositService);
        usersService = module.get<UsersService>(UsersService);
    });

    describe('deposit', () => {
        it('should return the user with updated deposit', async () => {
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
            jest.spyOn(usersService, 'findOne').mockImplementation(() => Promise.resolve(dummyUser));
            jest.spyOn(usersService, 'update').mockImplementation((userId, updates) =>
                Promise.resolve(Object.assign({}, dummyUser, updates)),
            );
            expect(await depositService.deposit({ 5: 10, 10: 0, 50: 20 }, dummyUser._id)).toEqual({
                ...dummyUser,
                deposit: {
                    5: 10,
                    10: 10,
                    20: 0,
                    50: 20,
                    100: 0,
                },
            });
        });
    });
});

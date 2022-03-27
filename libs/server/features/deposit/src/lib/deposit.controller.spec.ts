import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User, usersMockRepository, UsersService } from '@mr/server/features/users';

import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';

describe('DepositController', () => {
    let controller: DepositController;
    let service: DepositService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DepositController],
            providers: [
                DepositService,
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: usersMockRepository,
                },
            ],
        }).compile();

        controller = module.get<DepositController>(DepositController);
        service = module.get<DepositService>(DepositService);
    });

    describe('deposit', () => {
        it('should return the user ', async () => {
            const user = {
                _id: 'id',
                username: 'username',
                role: 'admin' as any,
                deposit: {
                    5: 1,
                    10: 13,
                },
            };
            const request = {
                user: {
                    _id: 'id',
                },
            };
            jest.spyOn(service, 'deposit').mockImplementation(() =>
                Promise.resolve({ ...user, password: 'passwordHash', refreshTokens: [] }),
            );
            expect(await controller.deposit(request, {})).toEqual(user);
        });
    });
});

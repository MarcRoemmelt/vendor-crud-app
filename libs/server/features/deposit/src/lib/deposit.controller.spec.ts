import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '@mr/server/features/users';

import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';

describe('DepositController', () => {
    let controller: DepositController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DepositController],
            providers: [DepositService, UsersService],
        }).compile();

        controller = module.get<DepositController>(DepositController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

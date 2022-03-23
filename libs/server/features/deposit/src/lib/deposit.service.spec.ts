import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '@mr/server/features/users';

import { DepositService } from './deposit.service';

describe('DepositService', () => {
    let service: DepositService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DepositService, UsersService],
        }).compile();

        service = module.get<DepositService>(DepositService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

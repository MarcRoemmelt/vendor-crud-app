import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '@mr/server/features/users';

import { ResetController } from './reset.controller';

describe('ResetController', () => {
    let controller: ResetController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ResetController],
            providers: [UsersService],
        }).compile();

        controller = module.get<ResetController>(ResetController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

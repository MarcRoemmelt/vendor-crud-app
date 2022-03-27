import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User, usersMockRepository, UsersService } from '@mr/server/features/users';

import { ResetController } from './reset.controller';

describe('ResetController', () => {
    let controller: ResetController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ResetController],
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: usersMockRepository,
                },
            ],
        }).compile();

        controller = module.get<ResetController>(ResetController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

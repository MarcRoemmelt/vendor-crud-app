import { Test, TestingModule } from '@nestjs/testing';

import { ProductsService } from '@mr/server/features/products';
import { UsersService } from '@mr/server/features/users';

import { BuyController } from './buy.controller';
import { BuyService } from './buy.service';

describe('BuyController', () => {
    let controller: BuyController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BuyController],
            providers: [BuyService, ProductsService, UsersService],
        }).compile();

        controller = module.get<BuyController>(BuyController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

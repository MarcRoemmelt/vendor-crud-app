import { Test, TestingModule } from '@nestjs/testing';

import { ProductsService } from '@mr/server/features/products';
import { UsersService } from '@mr/server/features/users';

import { BuyService } from './buy.service';

describe('BuyService', () => {
    let service: BuyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BuyService, ProductsService, UsersService],
        }).compile();

        service = module.get<BuyService>(BuyService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

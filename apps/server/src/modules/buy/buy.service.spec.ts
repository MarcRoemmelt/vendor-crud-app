import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
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

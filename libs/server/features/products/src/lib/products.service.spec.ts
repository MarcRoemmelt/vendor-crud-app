import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { productsMockRepository } from './products.mock-repository';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
    let service: ProductsService;
    let repo: typeof productsMockRepository;
    const testProducts = [
        {
            _id: 'productId1',
            sellerId: 'id',
            productName: 'name',
            amountAvailable: 22,
            cost: 10,
        },
        {
            _id: 'productId2',
            sellerId: 'id',
            productName: 'name',
            amountAvailable: 22,
            cost: 10,
        },
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: productsMockRepository,
                },
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
        repo = module.get<typeof productsMockRepository>(getRepositoryToken(Product));
        repo.products = [...testProducts];
    });

    describe('create', () => {
        it('should return the new product ', async () => {
            const newProduct = {
                productName: 'name',
                amountAvailable: 22,
                cost: 10,
            };
            const userId = 'id';
            const { _id, ...product } = await service.create(newProduct, userId);
            expect(product).toEqual({
                ...newProduct,
                sellerId: userId,
            });
            expect(typeof _id).toBe('string');
        });
    });

    describe('findAll', () => {
        it('should return an array of all products ', async () => {
            expect(await service.findAll()).toEqual(testProducts);
        });
    });

    describe('findOne', () => {
        it('should return the product ', async () => {
            expect(await service.findOne('productId2')).toEqual(testProducts[1]);
        });
    });

    describe('update', () => {
        it('should return the updated product ', async () => {
            expect(await service.update('productId1', { productName: 'newName' })).toEqual({
                ...testProducts[0],
                productName: 'newName',
            });
        });
    });

    describe('remove', () => {
        it('should return the removed product', async () => {
            expect(await service.remove(testProducts[0]._id)).toEqual(testProducts[0]);
            expect(await service.findAll()).toEqual([testProducts[1]]);
        });
    });
});

import { Test, TestingModule } from '@nestjs/testing';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductsService],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
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
            const products = [
                {
                    _id: 'productId',
                    sellerId: 'id',
                    productName: 'name',
                    amountAvailable: 22,
                    cost: 10,
                },
            ];
            service['products'] = products;
            expect(await service.findAll()).toEqual(products);
        });
    });

    describe('findOne', () => {
        it('should return the product ', async () => {
            const products = [
                {
                    _id: 'productId',
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
            service['products'] = products;
            expect(await service.findOne('productId2')).toEqual(products[1]);
        });
    });

    describe('update', () => {
        it('should return the updated product ', async () => {
            const products = [
                {
                    _id: 'productId',
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
            service['products'] = products;
            expect(await service.update('productId', { productName: 'newName' })).toEqual({
                ...products[0],
                productName: 'newName',
            });
        });
    });

    describe('remove', () => {
        it('should return the removed product', async () => {
            const product1 = {
                _id: 'productId',
                sellerId: 'id',
                productName: 'name',
                amountAvailable: 22,
                cost: 10,
            };
            const product2 = {
                _id: 'productId2',
                sellerId: 'id',
                productName: 'name',
                amountAvailable: 22,
                cost: 10,
            };
            const products = [product1, product2];
            service['products'] = products;
            expect(await service.remove(product1._id)).toEqual(product1);
            expect(service['products']).toEqual([product2]);
        });
    });
});

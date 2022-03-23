import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '@mr/server/features/users';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
    let controller: ProductsController;
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [ProductsService, UsersService],
        }).compile();

        controller = module.get<ProductsController>(ProductsController);
        service = module.get<ProductsService>(ProductsService);
    });

    describe('create', () => {
        it('should return the new product ', async () => {
            const newProduct = {
                productName: 'name',
                amountAvailable: 22,
                cost: 10,
            };
            const request = {
                user: {
                    _id: 'id',
                },
            };
            jest.spyOn(service, 'create').mockImplementation(() =>
                Promise.resolve({ ...newProduct, _id: 'productId', sellerId: 'id' }),
            );
            expect(await controller.create(request, newProduct)).toEqual({
                ...newProduct,
                _id: 'productId',
                sellerId: 'id',
            });
        });
    });

    describe('findAll', () => {
        it('should return an array of all products ', async () => {
            const product = {
                _id: 'productId',
                sellerId: 'id',
                productName: 'name',
                amountAvailable: 22,
                cost: 10,
            };
            jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve([product]));
            expect(await controller.findAll()).toEqual([product]);
        });
    });

    describe('findOne', () => {
        it('should return the product ', async () => {
            const product = {
                _id: 'productId',
                sellerId: 'id',
                productName: 'name',
                amountAvailable: 22,
                cost: 10,
            };
            jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(product));
            expect(await controller.findOne(product._id)).toEqual(product);
        });
    });

    describe('update', () => {
        it('should return the updated product ', async () => {
            const product = {
                _id: 'productId',
                sellerId: 'id',
                productName: 'name',
                amountAvailable: 22,
                cost: 10,
            };

            jest.spyOn(service, 'update').mockImplementation((_productId, update) =>
                Promise.resolve(Object.assign(product, update)),
            );
            expect(await controller.update(product._id, { productName: 'newName' })).toBe(product);
        });
    });

    describe('remove', () => {
        it('should return the removed product', async () => {
            const product = {
                _id: 'productId',
                sellerId: 'id',
                productName: 'name',
                amountAvailable: 22,
                cost: 10,
            };
            jest.spyOn(service, 'remove').mockImplementation(() => Promise.resolve(product));
            expect(await controller.remove(product._id)).toBe(product);
        });
    });
});

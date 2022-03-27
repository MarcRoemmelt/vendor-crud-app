import fastify, { FastifyRequest, RawServerDefault } from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { Test } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ThrottlerModule } from '@nestjs/throttler';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User, usersMockRepository } from '@mr/server/features/users';

import { productsMockRepository } from '../src/lib/products.mock-repository';
import { ProductsModule } from '../src/lib/products.module';
import { Product } from '../src/lib/entities/product.entity';

describe('Products', () => {
    let app: NestFastifyApplication;
    const dummyUser = {
        _id: 'id',
        username: 'username',
        role: 'buyer' as any,
        deposit: {
            5: 0,
        },
        password: 'passwordHash',
    };

    const newProduct1 = {
        productName: 'product1',
        cost: 10,
        amountAvailable: 20,
    };
    const newProduct2 = {
        productName: 'product2',
        cost: 12,
        amountAvailable: 200,
    };
    let product1: Product;
    let product2: Product;

    beforeAll(async () => {
        const fastifyInstance = fastify();
        fastifyInstance.addHook(
            'onRequest',
            (
                req: FastifyRequest<RouteGenericInterface, RawServerDefault> & { user: typeof dummyUser },
                res,
                nextInner,
            ) => {
                req.user = dummyUser;
                nextInner();
            },
        );

        const moduleRef = await Test.createTestingModule({
            imports: [
                ProductsModule,
                ThrottlerModule.forRoot({
                    ttl: 60,
                    limit: 10,
                }),
            ],
        })
            .overrideProvider(getRepositoryToken(Product))
            .useValue(productsMockRepository)
            .overrideProvider(getRepositoryToken(User))
            .useValue(usersMockRepository)
            .compile();

        app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter(fastifyInstance));
        await app.init();
        await app.getHttpAdapter().getInstance().ready();
    });

    describe('/POST products', () => {
        it(`should return the created product`, async () => {
            await app
                .inject({
                    method: 'POST',
                    url: '/products',
                    payload: newProduct1,
                })
                .then((result) => {
                    expect(result.statusCode).toEqual(201);
                    const { _id, ...createdProduct } = JSON.parse(result.body);
                    product1 = { _id, ...createdProduct };
                    expect(createdProduct).toEqual({ ...newProduct1, sellerId: dummyUser._id });
                    expect(typeof _id).toBe('string');
                });

            await app
                .inject({
                    method: 'POST',
                    url: '/products',
                    payload: newProduct2,
                })
                .then((result) => {
                    expect(result.statusCode).toEqual(201);
                    const { _id, ...createdProduct } = JSON.parse(result.body);
                    product2 = { _id, ...createdProduct };
                    expect(createdProduct).toEqual({ ...newProduct2, sellerId: dummyUser._id });
                    expect(typeof _id).toBe('string');
                });
        });
    });

    describe('/GET products', () => {
        it(`should return all products`, () => {
            return app
                .inject({
                    method: 'GET',
                    url: '/products',
                })
                .then((result) => {
                    expect(result.statusCode).toEqual(200);
                    expect(JSON.parse(result.body)).toEqual([product1, product2]);
                });
        });
    });

    describe('/GET products/:productid', () => {
        it(`should return the product matching :productid`, () => {
            const payload = {
                5: 2,
                10: 2,
                50: 2,
            };

            return app
                .inject({
                    method: 'GET',
                    url: `/products/${product1._id}`,
                    payload,
                })
                .then((result) => {
                    expect(result.statusCode).toEqual(200);
                    expect(JSON.parse(result.body)).toEqual(product1);
                });
        });
    });

    describe('/PATCH products/:productid', () => {
        it(`should update and return the product matching productid`, () => {
            const payload = {
                productName: 'newName',
            };

            return app
                .inject({
                    method: 'PATCH',
                    url: `/products/${product1._id}`,
                    payload,
                })
                .then((result) => {
                    expect(result.statusCode).toEqual(200);
                    expect(JSON.parse(result.body)).toEqual({ ...product1, productName: payload.productName });
                });
        });
    });

    describe('/DELETE products/:productid', () => {
        it(`should delete and return the product matching productid`, () => {
            return app
                .inject({
                    method: 'DELETE',
                    url: `/products/${product2._id}`,
                })
                .then((result) => {
                    expect(result.statusCode).toEqual(200);
                    expect(JSON.parse(result.body)).toEqual(product2);
                });
        });
    });

    afterAll(async () => {
        await app.close();
    });
});

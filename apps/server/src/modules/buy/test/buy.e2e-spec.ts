import fastify, { FastifyRequest, RawServerDefault } from 'fastify';
import { Test } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import { Product, productsMockRepository, ProductsModule } from '@mr/server/features/products';
import { User, usersMockRepository, UsersModule } from '@mr/server/features/users';

import { RouteGenericInterface } from 'fastify/types/route';
import { BuyService } from '../buy.service';
import { BuyModule } from '../buy.module';

describe('Buy', () => {
    let app: NestFastifyApplication;
    const buyService = { buy: (deposit) => deposit };
    const dummyUser = {
        _id: 'id',
        username: 'username',
        role: 'buyer' as any,
        deposit: {
            5: 0,
        },
        password: 'passwordHash',
    };

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
                UsersModule,
                ProductsModule,
                BuyModule,
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
            .overrideProvider(BuyService)
            .useValue(buyService)
            .compile();

        app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter(fastifyInstance));
        await app.init();
        await app.getHttpAdapter().getInstance().ready();
    });

    it(`/POST buy`, () => {
        const payload = {
            productId: '',
            amount: '',
        };

        return app
            .inject({
                method: 'POST',
                url: '/buy',
                payload,
            })
            .then((result) => {
                expect(result.statusCode).toEqual(200);
                expect(JSON.parse(result.body)).toEqual(payload);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});

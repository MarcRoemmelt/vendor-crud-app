import fastify, { FastifyRequest, RawServerDefault } from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { Test } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ThrottlerModule } from '@nestjs/throttler';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User, UsersModule, usersMockRepository } from '@mr/server/features/users';

import { DepositModule } from '../src/lib/deposit.module';
import { DepositService } from '../src/lib/deposit.service';

describe('Deposit', () => {
    let app: NestFastifyApplication;
    const depositService = { deposit: (deposit) => deposit };
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
                DepositModule,
                ThrottlerModule.forRoot({
                    ttl: 60,
                    limit: 10,
                }),
            ],
        })
            .overrideProvider(getRepositoryToken(User))
            .useValue(usersMockRepository)
            .overrideProvider(DepositService)
            .useValue(depositService)
            .compile();

        app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter(fastifyInstance));
        await app.init();
        await app.getHttpAdapter().getInstance().ready();
    });

    it(`/POST deposit`, () => {
        const payload = {
            5: 2,
            10: 2,
            50: 2,
        };

        return app
            .inject({
                method: 'POST',
                url: '/deposit',
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

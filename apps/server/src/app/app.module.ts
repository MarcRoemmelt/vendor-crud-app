import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthenticationModule, JwtAuthGuard, PoliciesGuard, RolesGuard } from '@mr/server/features/authetication';
import { CaslModule } from '@mr/server/features/casl';
import { User, UsersModule, UsersService } from '@mr/server/features/users';
import { DepositModule } from '@mr/server/features/deposit';
import { Product, ProductsModule } from '@mr/server/features/products';

import { AppController } from './app.controller';
import { ResetModule } from '../modules/reset/reset.module';
import { BuyModule } from '../modules/buy/buy.module';
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const username = configService.get('MONGODB_USER');
                const password = configService.get('MONGODB_PASSWORD');
                const host = configService.get('MONGODB_HOST');
                const isProd = configService.get('NODE_ENV') === 'production';
                const url = `mongodb${
                    isProd ? '+srv' : ''
                }://${username}:${password}@${host}/mvp-factory-vendor-app?retryWrites=true&w=majority`;
                return {
                    type: 'mongodb',
                    url,
                    autoLoadEntities: true,
                };
            },
            inject: [ConfigService],
        }),
        AuthenticationModule.register({
            UsersService,
            UsersModule,
        }),
        BuyModule,
        CaslModule.register({
            subjects: [User, Product],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
                JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
                JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
                JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
            }),
        }),
        DepositModule,
        ProductsModule,
        ResetModule,
        ThrottlerModule.forRoot({
            ttl: 10,
            limit: 20,
        }),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        {
            provide: APP_GUARD,
            useClass: PoliciesGuard,
        },
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule {}

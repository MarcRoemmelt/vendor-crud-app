import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

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
        AuthenticationModule.register({
            UsersService,
        }),
        BuyModule,
        CaslModule.register({
            subjects: [User, Product],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DepositModule,
        ProductsModule,
        ResetModule,
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        {
            provide: APP_GUARD,
            useClass: PoliciesGuard,
        },
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}

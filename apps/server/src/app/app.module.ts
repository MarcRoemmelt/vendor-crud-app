import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { CaslModule } from '../modules/casl/casl.module';
import { PoliciesGuard } from '../guards/policies-guard/policies-guard.guard';
import { RolesGuard } from '../guards/roles-guard.guard';
import { AuthModule } from '../modules/auth/auth.module';
import { JwtAuthGuard } from '../modules/auth/guards/jwt.guard';
import { DepositModule } from '../modules/deposit/deposit.module';
import { ProductsModule } from '../modules/products/products.module';
import { UsersModule } from '../modules/users/users.module';
import { AppController } from './app.controller';
import { BuyModule } from '../modules/buy/buy.module';
import { ResetModule } from '../modules/reset/reset.module';

@Module({
    imports: [
        AuthModule,
        BuyModule,
        CaslModule,
        ConfigModule.forRoot(),
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

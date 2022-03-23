import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { ProductsService } from '@mr/server/features/products';
import { UsersService } from '@mr/server/features/users';

import { BuyController } from './buy.controller';
import { BuyService } from './buy.service';
import { DepositService } from '@mr/server/features/deposit';

@Module({
    controllers: [BuyController],
    providers: [
        BuyService,
        DepositService,
        ProductsService,
        UsersService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class BuyModule {}

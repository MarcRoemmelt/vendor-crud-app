import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { ProductsService } from '@mr/server/features/products';
import { UsersService } from '@mr/server/features/users';

import { BuyController } from './buy.controller';
import { BuyService } from './buy.service';

@Module({
    controllers: [BuyController],
    providers: [
        ProductsService,
        UsersService,
        BuyService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class BuyModule {}

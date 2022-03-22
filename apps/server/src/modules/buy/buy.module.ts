import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
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

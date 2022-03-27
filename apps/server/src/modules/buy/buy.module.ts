import { Module } from '@nestjs/common';

import { ProductsModule, ProductsService } from '@mr/server/features/products';
import { UsersModule, UsersService } from '@mr/server/features/users';

import { BuyController } from './buy.controller';
import { BuyService } from './buy.service';
import { DepositService } from '@mr/server/features/deposit';

@Module({
    imports: [UsersModule, ProductsModule],
    controllers: [BuyController],
    providers: [BuyService, DepositService, ProductsService, UsersService],
})
export class BuyModule {}

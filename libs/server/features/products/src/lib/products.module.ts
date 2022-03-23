import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UpdateProductPolicy } from './update-product.policy';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, UpdateProductPolicy],
    exports: [ProductsService],
})
export class ProductsModule {}

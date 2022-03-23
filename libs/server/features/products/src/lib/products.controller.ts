import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';

import { CheckPolicies } from '@mr/server/features/authetication';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductPolicy } from './update-product.policy';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    create(@Req() req, @Body() createProductDto: CreateProductDto) {
        const userId = req.user._id;
        return this.productsService.create(createProductDto, userId);
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':productid')
    findOne(@Param('productid') productid: string) {
        return this.productsService.findOne(productid);
    }

    @CheckPolicies(UpdateProductPolicy)
    @Patch(':productid')
    update(@Param('productid') productid: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(productid, updateProductDto);
    }

    @CheckPolicies(UpdateProductPolicy)
    @Delete(':productid')
    remove(@Param('productid') productid: string) {
        return this.productsService.remove(productid);
    }
}

import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    create(createProductDto: CreateProductDto, userId: string) {
        const product: Product = {
            _id: uuidv4(),
            sellerId: userId,
            ...createProductDto,
        };
        return this.products.push(product);
    }

    findAll() {
        return this.products;
    }

    findOne(_productid: string) {
        return this.products.find(({ _id }) => _id === _productid);
    }

    update(_productid: string, updateProductDto: UpdateProductDto) {
        const product = this.products.find(({ _id }) => _id === _productid);
        const updatedProduct = Object.assign(product, updateProductDto);
        return updatedProduct;
    }

    remove(_productid: string) {
        this.products = this.products.filter(({ _id }) => _id !== _productid);
    }
}

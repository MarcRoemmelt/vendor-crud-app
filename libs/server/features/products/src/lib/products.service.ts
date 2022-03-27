import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) {}

    async create(createProductDto: CreateProductDto, userId: string) {
        const product: Product = {
            _id: uuidv4(),
            sellerId: userId,
            ...createProductDto,
        };
        return this.productsRepository.save(product);
    }

    async findAll(sellerId?: string) {
        const filter = sellerId ? { sellerId } : {};
        return this.productsRepository.find(filter);
    }

    async findOne(productId: string) {
        return this.productsRepository.findOne({ _id: productId });
    }

    async update(productId: string, updateProductDto: UpdateProductDto) {
        await this.productsRepository.update({ _id: productId }, updateProductDto);
        return this.productsRepository.findOne({ _id: productId });
    }

    async remove(productId: string) {
        const product = await this.productsRepository.findOne({ _id: productId });
        await this.productsRepository.delete({ _id: productId });
        return product;
    }
}

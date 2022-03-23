import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiPropertyOptional()
    amountAvailable?: number;

    @ApiPropertyOptional()
    productName?: string;

    @ApiPropertyOptional()
    cost?: number;
}

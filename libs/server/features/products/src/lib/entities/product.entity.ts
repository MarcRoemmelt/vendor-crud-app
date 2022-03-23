import { ApiProperty } from '@nestjs/swagger';

export class Product {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    amountAvailable: number;

    @ApiProperty()
    productName: string;

    @ApiProperty()
    cost: number;

    @ApiProperty()
    sellerId: string;
}

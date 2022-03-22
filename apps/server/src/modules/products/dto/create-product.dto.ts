import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty()
    amountAvailable: number;

    @ApiProperty()
    productName: string;

    @ApiProperty()
    cost: number;
}

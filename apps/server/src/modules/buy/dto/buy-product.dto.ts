import { ApiProperty } from '@nestjs/swagger';

export class BuyProductDto {
    @ApiProperty()
    productId: string;

    @ApiProperty()
    amount: number;
}

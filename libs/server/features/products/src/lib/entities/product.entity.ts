import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({
    name: 'products',
})
export class Product {
    @ApiProperty()
    @ObjectIdColumn()
    _id: string;

    @ApiProperty()
    @Column()
    amountAvailable: number;

    @ApiProperty()
    @Column()
    productName: string;

    @ApiProperty()
    @Column()
    cost: number;

    @ApiProperty()
    @Column()
    sellerId: string;
}

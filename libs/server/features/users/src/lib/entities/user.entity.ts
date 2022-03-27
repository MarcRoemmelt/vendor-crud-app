import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

import { Role } from '@mr/server/features/authetication';

export type Coins = {
    5?: number;
    10?: number;
    20?: number;
    50?: number;
    100?: number;
};

@Entity({
    name: 'users',
})
export class User {
    @ApiProperty()
    @ObjectIdColumn()
    _id: string;

    @ApiProperty()
    @Column()
    username: string;

    @ApiProperty({ enum: Role })
    @Column()
    role: Role;

    @ApiProperty({
        type: 'object',
        properties: {
            '5': { type: 'number' },
            '10': { type: 'number' },
            '20': { type: 'number' },
            '50': { type: 'number' },
            '100': { type: 'number' },
        },
    })
    @Column()
    deposit: Coins;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @Column()
    refreshTokens: string[];
}

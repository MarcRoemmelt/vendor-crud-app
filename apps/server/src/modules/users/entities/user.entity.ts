import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../../../enums/role.enum';
import { Coins } from '../../deposit/entities/deposit.entity';

export class User {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    username: string;

    @ApiProperty({ enum: Role })
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
    deposit: Coins;

    @ApiProperty()
    password: string;

    @ApiProperty()
    refreshToken?: string;
}

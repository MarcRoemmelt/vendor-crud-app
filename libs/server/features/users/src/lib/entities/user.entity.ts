import { ApiProperty } from '@nestjs/swagger';

import { Role } from '@mr/server/features/authetication';

export type Coins = {
    5?: number;
    10?: number;
    20?: number;
    50?: number;
    100?: number;
};

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

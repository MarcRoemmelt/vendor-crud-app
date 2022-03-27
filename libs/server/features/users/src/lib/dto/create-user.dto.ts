import { ApiProperty } from '@nestjs/swagger';

import { Role } from '@mr/server/features/authetication';

import { Coins } from '../entities/user.entity';

export class CreateUserDto {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    deposit?: Coins;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ enum: Role })
    role: Role;

    @ApiProperty()
    refreshTokens: string[];
}

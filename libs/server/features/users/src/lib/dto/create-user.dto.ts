import { ApiProperty } from '@nestjs/swagger';

import { Role } from '@mr/server/features/authetication';

export class CreateUserDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ enum: Role })
    role: Role;
}

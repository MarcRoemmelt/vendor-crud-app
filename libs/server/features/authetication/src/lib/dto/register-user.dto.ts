import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../role.enum';

export class RegisterUserDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ enum: Role })
    role: Role;
}

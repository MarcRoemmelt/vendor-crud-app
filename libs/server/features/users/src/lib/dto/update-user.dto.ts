import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

import { Role } from '@mr/server/features/authetication';

import { User } from '../entities/user.entity';

export class PublicUpdateUserDto {
    @ApiPropertyOptional()
    username?: string;

    @ApiPropertyOptional()
    role?: Role;
}
export class UpdateUserDto extends PartialType(User) {}

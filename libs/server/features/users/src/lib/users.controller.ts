import { Controller, Get, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { Roles, CheckPolicies, Role } from '@mr/server/features/authetication';

import { UsersService } from './users.service';
import { PublicUpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPolicy } from './update-user.policy';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiResponse({
        type: [User],
    })
    @Get()
    @Roles(Role.Admin)
    findAll() {
        return this.usersService.findAll();
    }

    @CheckPolicies(UpdateUserPolicy)
    @Get(':userid')
    async findOne(@Param('userid') userid: string) {
        const user = await this.usersService.findOne(userid);
        if (!user) throw new HttpException('User not found', 404);
        const { password: _, refreshTokens: _r, ...publicUser } = user;
        return publicUser;
    }

    @CheckPolicies(UpdateUserPolicy)
    @Patch(':userid')
    async update(@Param('userid') userid: string, @Body() updateUserDto: PublicUpdateUserDto) {
        const user = await this.usersService.update(userid, updateUserDto);
        if (!user) throw new HttpException('User not found', 404);
        const { password: _, refreshTokens: _r, ...publicUser } = user;
        return publicUser;
    }

    @CheckPolicies(UpdateUserPolicy)
    @Delete(':userid')
    async remove(@Param('userid') userid: string) {
        const user = await this.usersService.remove(userid);
        if (!user) throw new HttpException('User not found', 404);
        const { password: _, refreshTokens: _r, ...publicUser } = user;
        return publicUser;
    }
}

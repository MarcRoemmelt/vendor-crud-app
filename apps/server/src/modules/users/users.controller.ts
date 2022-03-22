import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PublicUpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { Public } from '../../decorators/public.decorator';
import { CheckPolicies } from '../../decorators/check-policies.decorator';
import { UpdateUserPolicy } from './update-user.policy';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

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
    findOne(@Param('userid') userid: string) {
        return this.usersService.findOne(userid);
    }

    @CheckPolicies(UpdateUserPolicy)
    @Patch(':userid')
    update(@Param('userid') userid: string, @Body() updateUserDto: PublicUpdateUserDto) {
        return this.usersService.update(userid, updateUserDto);
    }

    @CheckPolicies(UpdateUserPolicy)
    @Delete(':userid')
    remove(@Param('userid') userid: string) {
        return this.usersService.remove(userid);
    }
}

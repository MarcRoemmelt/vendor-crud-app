import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UpdateUserPolicy } from './update-user.policy';
import { User } from './entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, UpdateUserPolicy],
    exports: [UsersService, UpdateUserPolicy, TypeOrmModule],
})
export class UsersModule {}

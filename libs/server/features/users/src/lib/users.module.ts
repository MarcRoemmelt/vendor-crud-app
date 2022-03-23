import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UpdateUserPolicy } from './update-user.policy';

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        UpdateUserPolicy,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
    exports: [UsersService, UpdateUserPolicy],
})
export class UsersModule {}

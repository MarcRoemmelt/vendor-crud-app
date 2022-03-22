import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UsersService } from '../users/users.service';
import { ResetController } from './reset.controller';

@Module({
    controllers: [ResetController],
    providers: [
        UsersService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class ResetModule {}

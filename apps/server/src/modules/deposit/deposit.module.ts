import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UpdateUserPolicy } from '../users/update-user.policy';
import { UsersService } from '../users/users.service';
import { DepositController } from './deposit.controller';

import { DepositService } from './deposit.service';

@Module({
    controllers: [DepositController],
    providers: [
        UsersService,
        UpdateUserPolicy,
        DepositService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class DepositModule {}

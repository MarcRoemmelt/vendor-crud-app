import { Module } from '@nestjs/common';

import { UpdateUserPolicy, UsersModule, UsersService } from '@mr/server/features/users';

import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';
import { DepositPolicy } from './deposit.policy';

@Module({
    imports: [UsersModule],
    controllers: [DepositController],
    providers: [UsersService, UpdateUserPolicy, DepositService, DepositPolicy],
})
export class DepositModule {}

import { Module } from '@nestjs/common';

import { UsersModule, UsersService } from '@mr/server/features/users';

import { ResetController } from './reset.controller';

@Module({
    imports: [UsersModule],
    controllers: [ResetController],
    providers: [UsersService],
})
export class ResetModule {}

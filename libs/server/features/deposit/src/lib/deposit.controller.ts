import { Body, Controller, Post, Req } from '@nestjs/common';

import { Roles, Role, CheckPolicies } from '@mr/server/features/authetication';
import { UpdateUserPolicy } from '@mr/server/features/users';

import { DepositService } from './deposit.service';
import { DepositDto } from './dto/deposit.dto';

@Controller('deposit')
export class DepositController {
    constructor(private readonly depositService: DepositService) {}

    @Post()
    @Roles(Role.Buyer)
    @CheckPolicies(UpdateUserPolicy)
    async deposit(@Req() req, @Body() depositDto: DepositDto) {
        const userId = req.user._id;
        return this.depositService.deposit(depositDto, userId);
    }
}

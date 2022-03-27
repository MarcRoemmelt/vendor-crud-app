import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';

import { Roles, Role, CheckPolicies } from '@mr/server/features/authetication';

import { DepositService } from './deposit.service';
import { DepositDto } from './dto/deposit.dto';
import { DepositPolicy } from './deposit.policy';

@Controller('deposit')
export class DepositController {
    constructor(private readonly depositService: DepositService) {}

    @Post()
    @HttpCode(200)
    @Roles(Role.Buyer)
    @CheckPolicies(DepositPolicy)
    async deposit(@Req() req, @Body() depositDto: DepositDto) {
        const userId = req.user._id;
        const user = await this.depositService.deposit(depositDto, userId);
        const { refreshTokens: _r, password: _p, ...publicUser } = user;
        return publicUser;
    }
}

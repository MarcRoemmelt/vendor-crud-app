import { Body, Controller, Post, Req } from '@nestjs/common';
import { CheckPolicies } from '../../decorators/check-policies.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { UpdateUserPolicy } from '../users/update-user.policy';
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

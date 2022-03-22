import { Controller, Post, Req } from '@nestjs/common';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';

import { UsersService } from '../users/users.service';

@Controller('reset')
export class ResetController {
    constructor(private usersService: UsersService) {}

    @Roles(Role.Buyer)
    @Post()
    async reset(@Req() req) {
        const userId = req.user._id;
        return this.usersService.resetDeposit(userId);
    }
}

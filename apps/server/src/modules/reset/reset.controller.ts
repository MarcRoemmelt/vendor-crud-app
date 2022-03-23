import { Controller, Post, Req } from '@nestjs/common';

import { UsersService } from '@mr/server/features/users';
import { Roles } from '@mr/server/features/authetication';

import { Role } from '../../enums/role.enum';

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

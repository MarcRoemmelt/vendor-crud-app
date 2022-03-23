import { Injectable } from '@nestjs/common';

import { Coins, UsersService } from '@mr/server/features/users';

import { DepositDto } from './dto/deposit.dto';
import { Deposit } from './entities/deposit.entity';

@Injectable()
export class DepositService {
    constructor(private usersService: UsersService) {}

    async deposit(depositeDto: DepositDto, userId: string) {
        const user = await this.usersService.findOne(userId);
        return this.usersService.update(userId, { deposit: new Deposit(user.deposit).add(depositeDto).coins });
    }

    createDeposit(coins: Coins) {
        return new Deposit(coins);
    }
}

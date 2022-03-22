import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { DepositDto } from './dto/deposit.dto';
import { Deposit } from './entities/deposit.entity';

@Injectable()
export class DepositService {
    constructor(private usersService: UsersService) {}

    async deposit(depositeDto: DepositDto, userId: string) {
        const user = await this.usersService.findOne(userId);
        return this.usersService.update(userId, { deposit: new Deposit(user.deposit).add(depositeDto).coins });
    }
}

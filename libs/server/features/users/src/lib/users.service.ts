import * as bcrypt from 'bcrypt';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async create(user: CreateUserDto) {
        const newUser = {
            deposit: {
                5: 0,
                10: 0,
                20: 0,
                50: 0,
                100: 0,
            },
            refreshTokens: [],
            ...user,
        };
        return this.usersRepository.save(newUser);
    }

    async findAll() {
        return this.usersRepository.find();
    }

    async findByUsername(username: string) {
        return this.usersRepository.findOne({ username });
    }

    async findOne(_id: string) {
        return this.usersRepository.findOne({ _id });
    }

    async findOneIfRefreshTokenMatches(userId: string, token: string) {
        const user = await this.findOne(userId);
        const hasMatchingToken = await this.hasRefreshToken(token, user?.refreshTokens);
        if (hasMatchingToken) return user;
        return null;
    }

    private async hasRefreshToken(token: string, hashedTokens: string[] = []) {
        for (const hashedToken of hashedTokens) {
            if (await bcrypt.compare(token, hashedToken)) return true;
        }
        return false;
    }

    async update(userId: string, updateUserDto: UpdateUserDto) {
        await this.usersRepository.update({ _id: userId }, updateUserDto);
        const user = await this.findOne(userId);
        if (!user) throw new HttpException('User not found', 404);
        return user;
    }

    async remove(userId: string) {
        const user = await this.findOne(userId);
        await this.usersRepository.delete({ _id: userId });
        return user;
    }

    async resetDeposit(userId: string) {
        return this.update(userId, { deposit: {} });
    }
}

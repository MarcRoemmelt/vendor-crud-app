import { HttpException, Injectable } from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [];

    async create({ username, password, role }: CreateUserDto) {
        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);

        if (this.findOne(username)) throw new HttpException('Username already registered', 409);

        const user: User = {
            _id: uuidv4(),
            username,
            password: hashedPassword,
            deposit: {},
            role,
        };

        return this.users.push(user);
    }

    findAll() {
        return this.users;
    }

    findOne(_userId: string) {
        return this.users.find(({ _id }) => _id === _userId);
    }

    update(_userId: string, updateUserDto: UpdateUserDto) {
        const user = this.users.find(({ _id }) => _id === _userId);
        return Object.assign(user, updateUserDto);
    }

    remove(_userId: string) {
        this.users = this.users.filter(({ _id }) => _id !== _userId);
    }

    resetDeposit(_userId: string) {
        return this.update(_userId, { deposit: {} });
    }
}

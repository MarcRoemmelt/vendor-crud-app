import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<null | Omit<User, 'password'>> {
        const user = await this.usersService.findOne(username);

        const isMatch = await bcrypt.compare(pass, user.password);
        if (user && isMatch) {
            const { password: _, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user._id };
        const refreshToken = this.jwtService.sign({ ...payload, typ: 'refresh' });
        const hasExistingSession = user.refreshToken;
        await this.usersService.update(user._id, { refreshToken });

        return {
            access_token: this.jwtService.sign({ ...payload, typ: 'access' }),
            refresh_token: refreshToken,
            hasExistingSession: Boolean(hasExistingSession),
        };
    }

    async session(authorizationHeader?: string) {
        if (!authorizationHeader) throw new UnauthorizedException();

        const token = authorizationHeader.replace('Bearer ', '');
        const payload = this.jwtService.verify<{ sub: string; username: string; typ: string }>(token);
        if (payload.typ !== 'refresh') throw new UnauthorizedException();

        const user = await this.usersService.findOne(payload.sub);

        if (!user || user.refreshToken !== token) throw new UnauthorizedException();

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async logoutAll(user: User) {
        const payload = { username: user.username, sub: user._id };
        const refreshToken = this.jwtService.sign({ ...payload, typ: 'refresh' });
        await this.usersService.update(user._id, { refreshToken });

        return {
            refresh_token: refreshToken,
        };
    }
}

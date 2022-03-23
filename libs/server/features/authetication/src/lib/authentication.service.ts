import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export interface UsersService {
    findOne(userId: string): User;
    update(userId: string, updates: Partial<User>): User;
}
export interface User {
    _id: string;
    username: string;
    password: string;
    refreshToken?: string;
}
export const USERS_SERVICE = 'USERS_SERVICE';
@Injectable()
export class AuthenticationService {
    constructor(@Inject(USERS_SERVICE) private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(userId: string, pass: string): Promise<null | Omit<User, 'password'>> {
        const user = await this.usersService.findOne(userId);

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

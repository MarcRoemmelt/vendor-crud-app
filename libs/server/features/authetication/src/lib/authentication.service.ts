import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { RegisterUserDto } from './dto/register-user.dto';

export interface UsersService {
    create(user: User): Promise<User>;
    findOne(userId: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    update(userId: string, updates: Partial<User>): Promise<User | null>;
    findOneIfRefreshTokenMatches(userId: string, token: string): Promise<User | null>;
}
export interface User {
    _id: string;
    username: string;
    password: string;
    role: any;
    refreshTokens: string[];
}
export const USERS_SERVICE = 'USERS_SERVICE';
@Injectable()
export class AuthenticationService {
    constructor(
        @Inject(USERS_SERVICE) private usersService: UsersService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async validateUser(username: string, pass: string): Promise<null | Omit<User, 'password'>> {
        const user = await this.usersService.findByUsername(username);

        const isMatch = await bcrypt.compare(pass, user?.password ?? '');
        if (user && isMatch) {
            const { password: _, ...result } = user;
            return result;
        }
        return null;
    }

    // eslint-disable-next-line max-lines-per-function
    async register({ username, password, role }: RegisterUserDto) {
        if (username.length < 4 || password.length < 4)
            throw new HttpException('Username and Password must be at least 4 characters long', 400);

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const existingUser = await this.usersService.findByUsername(username);
        if (existingUser) throw new HttpException('Username already registered', 409);

        const userId = uuidv4();
        const [refreshToken, hashedRefreshToken] = await this.generateRefreshTokenForUser(userId, username);
        const user: User = {
            _id: userId,
            username,
            refreshTokens: [hashedRefreshToken],
            password: hashedPassword,
            role,
        };

        const newUser = await this.usersService.create(user);
        const { password: _p, refreshTokens: _r, ...publicUser } = newUser;
        return {
            user: publicUser,
            refresh_token: refreshToken,
            access_token: await this.generateAccessToken(userId, username),
        };
    }

    async login(user: User) {
        const existingSessions = user.refreshTokens.length;
        const [newRefreshToken, hashedRefreshToken] = await this.generateRefreshTokenForUser(user._id, user.username);
        await this.usersService.update(user._id, { refreshTokens: [...user.refreshTokens, hashedRefreshToken] });

        return {
            user,
            access_token: await this.generateAccessToken(user._id, user.username),
            refresh_token: newRefreshToken,
            existingSessions,
        };
    }

    async refresh(user: User): Promise<Partial<User>> {
        return user ?? {};
    }

    async session(user: User) {
        return {
            access_token: await this.generateAccessToken(user._id, user.username),
        };
    }

    async logoutAll(user: User) {
        const [refreshToken, hashedRefreshToken] = await this.generateRefreshTokenForUser(user._id, user.username);
        await this.usersService.update(user._id, { refreshTokens: [hashedRefreshToken] });

        return {
            refresh_token: refreshToken,
        };
    }

    async generateRefreshTokenForUser(userId: string, username: string) {
        const token = await this.jwtService.sign(
            { username, sub: userId, typ: 'refresh' },
            {
                secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
            },
        );
        const hashedToken = await this.hashValue(token);
        return [token, hashedToken];
    }
    async generateAccessToken(userId: string, username: string) {
        const token = await this.jwtService.sign(
            { username, sub: userId, typ: 'access' },
            {
                secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
                expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
            },
        );
        return token;
    }

    async hashValue(value: string) {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(value, salt);
    }
}

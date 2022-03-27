import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthenticationService, UsersService, USERS_SERVICE } from '../authentication.service';
import { FastifyRequest } from 'fastify';

interface ITokenPayload {
    sub: string;
    username: string;
    typ: string;
}
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthenticationService,
        @Inject(USERS_SERVICE) private readonly userService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(request: FastifyRequest, payload: ITokenPayload) {
        if (payload.typ !== 'refresh') return null;

        const userId = payload.sub;
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request as any);
        if (!token) return null;
        return this.userService.findOneIfRefreshTokenMatches(userId, token);
    }
}

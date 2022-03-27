import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AuthenticationService, UsersService, USERS_SERVICE } from './authentication.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.strategy';

export interface AuthenticationModuleOptions<U extends new (...args: unknown[]) => UsersService> {
    UsersService: U;
    UsersModule: any;
}

@Module({})
export class AuthenticationModule {
    static register<U extends new (...args: unknown[]) => UsersService>({
        UsersService,
        UsersModule,
    }: AuthenticationModuleOptions<U>): DynamicModule {
        return {
            module: AuthenticationModule,
            imports: [UsersModule, ConfigModule, PassportModule, JwtModule.register({})],
            providers: [
                {
                    provide: USERS_SERVICE,
                    useClass: UsersService,
                },
                AuthenticationService,
                LocalStrategy,
                JwtStrategy,
                JwtRefreshTokenStrategy,
                {
                    provide: APP_GUARD,
                    useClass: ThrottlerGuard,
                },
            ],
            exports: [AuthenticationService],
        };
    }
}

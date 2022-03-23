/* eslint-disable max-lines-per-function */
import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthenticationService, UsersService, USERS_SERVICE } from './authentication.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

export interface AuthenticationModuleOptions<U extends new (...args: unknown[]) => UsersService> {
    UsersService: U;
}

@Module({})
export class AuthenticationModule {
    static register<U extends new (...args: unknown[]) => UsersService>({
        UsersService,
    }: AuthenticationModuleOptions<U>): DynamicModule {
        return {
            module: AuthenticationModule,
            imports: [
                PassportModule,
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    useFactory: async (configService: ConfigService) => ({
                        secret: configService.get<string>('JWT_SECRET'),
                        signOptions: { expiresIn: '60s' },
                    }),
                    inject: [ConfigService],
                }),
            ],
            providers: [
                {
                    provide: USERS_SERVICE,
                    useClass: UsersService,
                },
                AuthenticationService,
                LocalStrategy,
                JwtStrategy,
                {
                    provide: APP_GUARD,
                    useClass: ThrottlerGuard,
                },
            ],
            exports: [AuthenticationService],
        };
    }
}

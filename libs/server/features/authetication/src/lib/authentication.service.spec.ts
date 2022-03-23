/* eslint-disable max-lines-per-function */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService, USERS_SERVICE } from './authentication.service';

describe('AuthService', () => {
    let service: AuthenticationService;

    beforeEach(async () => {
        class UsersService {
            findOne = jest.fn(() => ({ _id: '1', username: 'name ' }));
            update = jest.fn(() => ({ _id: '1', username: 'name ' }));
        }

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    useFactory: async (configService: ConfigService) => ({
                        secret: configService.get<string>('JWT_SECRET'),
                        signOptions: { expiresIn: '60s' },
                    }),
                    inject: [ConfigService],
                }),
            ],
            providers: [{ provide: USERS_SERVICE, useClass: UsersService }, AuthenticationService],
        }).compile();

        service = module.get<AuthenticationService>(AuthenticationService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

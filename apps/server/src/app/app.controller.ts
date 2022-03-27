import { Controller, Request, Post, UseGuards, Body, HttpCode } from '@nestjs/common';

import {
    AuthenticationService,
    JwtRefreshGuard,
    LocalAuthGuard,
    Public,
    RegisterUserDto,
} from '@mr/server/features/authetication';

@Controller()
export class AppController {
    constructor(private authService: AuthenticationService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Public()
    @Post('users')
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    @Public()
    @UseGuards(JwtRefreshGuard)
    @Post('session')
    async session(@Request() req) {
        return this.authService.session(req.user);
    }

    @HttpCode(200)
    @Post('refresh')
    async refresh(@Request() req) {
        const user = await this.authService.refresh(req.user);
        const { password: _p, refreshTokens: _r, ...publicUser } = user;
        return publicUser;
    }

    @Post('logout')
    async logout() {
        return null;
    }

    @Post('logout/all')
    async logoutAll(@Request() req) {
        return this.authService.logoutAll(req.user);
    }
}

import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { AuthenticationService, LocalAuthGuard, Public } from '@mr/server/features/authetication';

@Controller()
export class AppController {
    constructor(private authService: AuthenticationService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Public()
    @Post('session')
    async session(@Request() req: FastifyRequest) {
        return this.authService.session(req.headers.authorization);
    }

    @Post('logout')
    async logout(@Request() req) {
        return req.logout();
    }

    @Post('logout/all')
    async logoutAll(@Request() req) {
        return this.authService.logoutAll(req.user);
    }
}

import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { Public } from '../decorators/public.decorator';
import { AuthService } from '../modules/auth/auth.service';
import { LocalAuthGuard } from '../modules/auth/guards/local-auth.guard';

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

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

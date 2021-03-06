import type { FastifyRequest } from 'fastify';
import { ExecutionContext, Injectable } from '@nestjs/common';

import { AppAbility, Action, IPolicyHandler } from '@mr/server/features/casl';

import { UsersService } from './users.service';

@Injectable()
export class UpdateUserPolicy implements IPolicyHandler {
    constructor(private usersService: UsersService) {}

    async handle(ability: AppAbility, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<FastifyRequest<{ Params: { userid: string } }>>();

        const user = await this.usersService.findOne(request.params.userid);
        const result = ability.can(Action.Manage, user);
        return result;
    }
}

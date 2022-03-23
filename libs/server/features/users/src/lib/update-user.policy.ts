import type { FastifyRequest } from 'fastify';
import { ExecutionContext, Injectable } from '@nestjs/common';

import { AppAbility, Action } from '@mr/server/features/casl';
import { IPolicyHandler } from '@mr/server/features/authetication';

import { UsersService } from './users.service';

@Injectable()
export class UpdateUserPolicy implements IPolicyHandler {
    constructor(private usersService: UsersService) {}

    async handle(ability: AppAbility, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<FastifyRequest<{ Params: { username: string } }>>();

        const user = await this.usersService.findOne(request.params.username);

        return ability.can(Action.Update, user);
    }
}

import type { FastifyRequest } from 'fastify';
import { ExecutionContext, Injectable } from '@nestjs/common';

import { AppAbility, Action, IPolicyHandler } from '@mr/server/features/casl';
import { UsersService } from '@mr/server/features/users';

@Injectable()
export class DepositPolicy implements IPolicyHandler {
    constructor(private usersService: UsersService) {}

    async handle(ability: AppAbility, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<FastifyRequest & { user: { _id: string } }>();

        const user = await this.usersService.findOne(request.user?._id);
        const result = ability.can(Action.Manage, user);
        return result;
    }
}

import type { FastifyRequest } from 'fastify';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AppAbility } from '../casl/casl-ability.factory';
import { IPolicyHandler } from '../../guards/policies-guard/policies-guard.types';
import { UsersService } from './users.service';
import { Action } from '../../enums/action.enum';

@Injectable()
export class UpdateUserPolicy implements IPolicyHandler {
    constructor(private usersService: UsersService) {}

    async handle(ability: AppAbility, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<FastifyRequest<{ Params: { username: string } }>>();

        const user = await this.usersService.findOne(request.params.username);

        return ability.can(Action.Update, user);
    }
}

import type { FastifyRequest } from 'fastify';
import { ExecutionContext, Injectable } from '@nestjs/common';

import { IPolicyHandler } from '@mr/server/features/authetication';
import { Action, AppAbility } from '@mr/server/features/casl';

import { ProductsService } from './products.service';

@Injectable()
export class UpdateProductPolicy implements IPolicyHandler {
    constructor(private productsService: ProductsService) {}

    async handle(ability: AppAbility, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<FastifyRequest<{ Params: { productname: string } }>>();

        const user = await this.productsService.findOne(request.params.productname);

        return ability.can(Action.Update, user);
    }
}

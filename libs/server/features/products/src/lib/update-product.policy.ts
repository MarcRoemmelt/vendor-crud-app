import type { FastifyRequest } from 'fastify';
import { ExecutionContext, Injectable } from '@nestjs/common';

import { Action, AppAbility, IPolicyHandler } from '@mr/server/features/casl';
import { ProductsService } from './products.service';

@Injectable()
export class UpdateProductPolicy implements IPolicyHandler {
    constructor(private productsService: ProductsService) {}

    async handle(ability: AppAbility, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<FastifyRequest<{ Params: { productid: string } }>>();

        const product = await this.productsService.findOne(request.params.productid);

        return ability.can(Action.Update, product);
    }
}

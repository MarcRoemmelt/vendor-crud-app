import type { FastifyRequest } from 'fastify';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AppAbility } from '../casl/casl-ability.factory';
import { IPolicyHandler } from '../../guards/policies-guard/policies-guard.types';
import { ProductsService } from './products.service';
import { Action } from '../../enums/action.enum';

@Injectable()
export class UpdateProductPolicy implements IPolicyHandler {
    constructor(private productsService: ProductsService) {}

    async handle(ability: AppAbility, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<FastifyRequest<{ Params: { productname: string } }>>();

        const user = await this.productsService.findOne(request.params.productname);

        return ability.can(Action.Update, user);
    }
}

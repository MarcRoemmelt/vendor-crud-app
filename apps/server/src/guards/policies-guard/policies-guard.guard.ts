import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

import { AppAbility, CaslAbilityFactory } from '../../modules/casl/casl-ability.factory';
import { CHECK_POLICIES_KEY } from '../../decorators/check-policies.decorator';
import { isClass } from '../../helpers/isClass';
import { PolicyHandler } from './policies-guard.types';

@Injectable()
export class PoliciesGuard implements CanActivate {
    constructor(
        private moduleRef: ModuleRef,
        private reflector: Reflector,
        private caslAbilityFactory: CaslAbilityFactory,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const policyHandlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];

        const { user } = context.switchToHttp().getRequest();
        const ability = this.caslAbilityFactory.createForUser(user);

        const policyResults = policyHandlers.map((handler) => this.execPolicyHandler(handler, ability, context));
        return (await Promise.all(policyResults)).every(Boolean);
    }

    private execPolicyHandler(handler: PolicyHandler, ability: AppAbility, context: ExecutionContext) {
        if (isClass(handler)) {
            const instantiatedHandler = this.moduleRef.get(handler, { strict: false });
            return instantiatedHandler.handle(ability, context);
        }
        if (typeof handler === 'function') {
            return handler(ability, context);
        }
        return handler.handle(ability, context);
    }
}

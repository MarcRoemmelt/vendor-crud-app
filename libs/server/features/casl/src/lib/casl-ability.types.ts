import { ExecutionContext, Type } from '@nestjs/common';
import { Ability, InferSubjects, Subject } from '@casl/ability';
import { Action } from '@mr/server/features/casl';

export interface IPolicyHandler {
    handle(ability: AppAbility, context: ExecutionContext): boolean | Promise<boolean>;
}

type PolicyHandlerCallback = (ability: AppAbility, context: ExecutionContext) => boolean;

export type PolicyHandler = Type<IPolicyHandler> | IPolicyHandler | PolicyHandlerCallback;

export type AppAbility = Ability<[Action, InferSubjects<Subject>]>;

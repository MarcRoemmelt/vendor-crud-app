import { Ability, InferSubjects, Subject } from '@casl/ability';
import { DynamicModule, Module } from '@nestjs/common';
import { Action } from './action.enum';
import { CaslAbilityFactory } from './casl-ability.factory';

export interface CaslModuleOptions<S extends Subject[]> {
    subjects: S;
    createAbility?: (arg: unknown) => Ability<[Action, InferSubjects<S extends Array<infer s> ? s : never>]>;
}

export const SUBJECTS = 'SUBJECTS';
export const CREATE_ABILITY = 'CREATE_ABILITY';

@Module({})
export class CaslModule {
    static register<S extends Subject[]>({ subjects, createAbility }: CaslModuleOptions<S>): DynamicModule {
        return {
            module: CaslModule,
            providers: [
                {
                    provide: SUBJECTS,
                    useValue: subjects,
                },
                {
                    provide: CREATE_ABILITY,
                    useValue: createAbility ?? (() => new Ability()),
                },
                CaslAbilityFactory,
            ],
            exports: [CaslAbilityFactory],
        };
    }
}

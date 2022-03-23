import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, Subject } from '@casl/ability';
import { Inject, Injectable } from '@nestjs/common';
import { Action } from './action.enum';

export type AppAbility = Ability<[Action, InferSubjects<Subject>]>;

const ADMIN_ROLE = 'admin';
@Injectable()
export class CaslAbilityFactory {
    constructor(
        @Inject('SUBJECTS') private subjects: Subject[],
        @Inject('CREATE_ABILITY')
        private createAbility?: (
            arg: unknown,
        ) => Ability<[Action, InferSubjects<typeof subjects extends Array<infer S> ? S : never>]>,
    ) {
        this.createAbility = createAbility;
    }

    createForUser<User extends { _id: string; role: Role }, Role extends string | number>(user: User) {
        type AbilityType = Ability<[Action, InferSubjects<typeof this.subjects extends Array<infer S> ? S : never>]>;
        const { can, build } = new AbilityBuilder<AbilityType>(Ability as AbilityClass<AbilityType>);

        if (user) {
            if (user.role === ADMIN_ROLE) {
                can(Action.Manage, 'all'); // read-write access to everything
            } else {
                can(Action.Read, 'all'); // read-only access to everything
            }

            can(Action.Manage, 'all', { userId: user._id });
            can(Action.Manage, 'all', { _user_id: user._id });
        }

        return build({
            // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<InferSubjects<typeof this.subjects>>,
        });
    }
}

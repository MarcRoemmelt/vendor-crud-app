import { Inject, Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityClass, InferSubjects, Subject } from '@casl/ability';

import { Action } from './action.enum';

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

            can(Action.Manage, 'Product', { sellerId: user._id });
            can(Action.Manage, 'User', { _id: user._id });
        }

        return build();
    }
}

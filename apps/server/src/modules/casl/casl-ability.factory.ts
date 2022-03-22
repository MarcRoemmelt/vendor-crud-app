import { Action } from '../../enums/action.enum';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Role } from '../../enums/role.enum';

type Subjects = InferSubjects<typeof Product | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);

        if (user) {
            if (user.role === Role.Admin) {
                can(Action.Manage, 'all'); // read-write access to everything
            } else {
                can(Action.Read, 'all'); // read-only access to everything
            }

            can(Action.Manage, User, { _id: user._id });
            can(Action.Manage, Product, { sellerId: user._id });
        }

        return build({
            // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}

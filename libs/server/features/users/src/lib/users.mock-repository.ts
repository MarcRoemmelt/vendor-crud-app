import { User } from './entities/user.entity';

export const usersMockRepository = {
    save: (user: User) => user,
    find: () => [],
    findOne: () => null,
    update: (_filter: any, _updates: Partial<User>) => null,
};

import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';

import { createAuthStore } from '@mr/client/data-access/auth-store';
import { createUserApi } from '@mr/client/data-access/user-api';

import { IUser, IManageProfileFormValues, Role, Coins } from './user-store.types';

const DEFAULT_USER = createUser();
function createUser(user?: Partial<IUser>) {
    return makeAutoObservable({
        _id: user?._id || '0',
        username: user?.username || 'no-user',
        role: user?.role || Role.Buyer,
        deposit: user?.deposit || {},
        set<F extends keyof IUser>(field: F, value: IUser[F]) {
            Object.assign(this, { [field]: value });
        },
        update(updates: Partial<IUser>) {
            Object.assign(this, updates);
        },
    });
}
export type UserStoreOptions = {
    api: ReturnType<typeof createUserApi>;
    authStore: ReturnType<typeof createAuthStore>;
};
// eslint-disable-next-line max-lines-per-function
export function createUserStore({ api, authStore }: UserStoreOptions) {
    return makeAutoObservable({
        authStore,
        currentUser: DEFAULT_USER,
        checkUser(userId?: string) {
            if (!userId || userId === DEFAULT_USER._id) {
                this.currentUser = DEFAULT_USER;
                return;
            }
            this.currentUser.update({ _id: userId });
            return this.fetchUser();
        },
        async updateUser(user: IManageProfileFormValues) {
            const { success, data: updates, error } = await api.update(this.currentUser._id, user);
            if (success) {
                this.currentUser.update(updates);
            }
            if (error) {
                toast(error.message);
            }
        },
        async resetBalance() {
            const { success, data: updates, error } = await api.reset();
            if (success) {
                this.currentUser.update(updates);
            }
            if (error) {
                toast(error.message);
            }
        },
        async fetchUser() {
            const { success, data: user, error } = await api.byId(this.currentUser._id);
            if (success) {
                this.currentUser.update(user);
            }
            if (error) {
                toast(error.message);
            }
        },
        async deleteUser() {
            const { success, error } = await api.del(this.currentUser._id);
            if (success) {
                this.currentUser.update(DEFAULT_USER);
            }
            if (error) {
                toast(error.message);
            }
        },
        async deposit(coins: Coins) {
            const { success, data: user, error } = await api.deposit(coins);
            if (success) {
                this.currentUser.update(user);
            }
            if (error) {
                toast(error.message);
            }
        },
    });
}

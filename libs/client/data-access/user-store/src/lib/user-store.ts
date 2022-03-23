import { makeAutoObservable } from 'mobx';

export type UserStoreOptions = {
    api: any;
};
export function createUserStore({ api: _api }: UserStoreOptions) {
    return makeAutoObservable({
        /* CurrentUser */
        /* FetchUserAll (admin) */
        /* FetchUser */
        /* UpdateUser */
        /* DeleteUser */
        /* DepositCoins */
    });
}

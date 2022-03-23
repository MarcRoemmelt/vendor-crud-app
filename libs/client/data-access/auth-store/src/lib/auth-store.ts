import { makeAutoObservable } from 'mobx';

export type AuthStoreOptions = {
    api: any;
};
export function createAuthStore({ api: _api }: AuthStoreOptions) {
    return makeAutoObservable({
        /* Login */
        /* Register */
        /* Logout */
        /* Logout All */
    });
}

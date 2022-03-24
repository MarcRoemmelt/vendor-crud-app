import { makeAutoObservable } from 'mobx';

import { createAuthApi } from '@mr/client/data-access/auth-api';

import { ILoginFormValues, IRegisterFormValues } from './auth-store.types';

export type AuthStoreOptions = {
    api: ReturnType<typeof createAuthApi>;
};

// eslint-disable-next-line max-lines-per-function
export function createAuthStore({ api }: AuthStoreOptions) {
    return makeAutoObservable({
        values: {
            username: '',
            password: '',
        },
        setUsername(username = '') {
            this.values.username = username;
        },
        setPassword(password = '') {
            this.values.password = password;
        },
        /* We use the values passed to this function instead of the saved values
         * The saved values are only for prepopulation of formfields in the UI */
        register: ({ username, password, role }: IRegisterFormValues) => {
            api.register(username, password, role);
        },
        login: ({ username, password }: ILoginFormValues) => {
            api.login(username, password);
        },
        logout: () => {
            api.logout();
        },
        logoutAll: () => {
            api.logoutAll();
        },
    });
}

import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';

import { createAuthApi } from '@mr/client/data-access/auth-api';

import { ILoginFormValues, IRegisterFormValues } from './auth-store.types';

export type AuthStoreOptions = {
    api: ReturnType<typeof createAuthApi>;
};

// eslint-disable-next-line max-lines-per-function
export function createAuthStore({ api }: AuthStoreOptions) {
    return makeAutoObservable({
        isAuthenticated: false,
        existingSessions: 0,
        activeModal: '',
        currentUser: '0',
        setIsAuthenticated(isAuthenticated: boolean) {
            this.isAuthenticated = isAuthenticated;
        },
        setActiveModal(modalName = '') {
            this.activeModal = modalName;
        },
        setCurrentUser(userId?: string) {
            this.currentUser = userId ?? '0';
        },
        setExistingSessions(numSessions: number) {
            this.existingSessions = numSessions;
        },
        /* We use the values passed to this function instead of the saved values
         * The saved values are only for prepopulation of formfields in the UI */
        async register({ username, password, role }: IRegisterFormValues) {
            const { success, data, error } = await api.register(username, password, role);
            if (success) {
                const { user, access_token, refresh_token } = data;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                this.setIsAuthenticated(true);
                this.setCurrentUser(user._id);
                return user;
            } else {
                toast(error.message);
            }
        },
        async login({ username, password }: ILoginFormValues) {
            const { success, data, error } = await api.login(username, password);
            if (success) {
                const { user, existingSessions, access_token, refresh_token } = data;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                this.setExistingSessions(existingSessions);
                this.setIsAuthenticated(true);
                this.setCurrentUser(user._id);
                return user;
            } else {
                toast(error.message);
            }
        },
        async logout() {
            this.setIsAuthenticated(false);
            this.currentUser = '0';
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        },
        async logoutAll() {
            const { success, data, error } = await api.logoutAll();
            if (success) {
                const { refresh_token } = data;
                localStorage.setItem('refresh_token', refresh_token);
                this.setExistingSessions(0);
            } else {
                toast(error.message);
            }
        },
        async refreshSession() {
            const { success, data } = await api.refresh();
            if (success) {
                this.setIsAuthenticated(true);
                this.setCurrentUser(data._id);
            } else {
                this.logout();
            }
        },
    });
}

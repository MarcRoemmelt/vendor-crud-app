import { Role } from '@mr/client/data-access/user-api';
import type { Requests } from '@mr/shared/data-access/superagent';

export const createAuthApi = (requests: Requests) => ({
    login: <R>(username: string, password: string) =>
        requests.post<R, { username: string; password: string }>('/login', { username, password }),
    register: <R>(username: string, password: string, role: Role) =>
        requests.post<R, { username: string; password: string; role: any }>('/users', { username, password, role }),
    logout: <R>() => requests.post<R>('/logout'),
    logoutAll: <R>() => requests.post<R>('/logout/all'),
    refresh: <R>() => requests.post<R>('/refresh'),
});

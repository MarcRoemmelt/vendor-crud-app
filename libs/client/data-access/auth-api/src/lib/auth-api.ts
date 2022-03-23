import { Role } from '@mr/client/data-access/user-api';
import type { Requests } from '@mr/shared/data-access/superagent';

export const authApi = (requests: Requests) => ({
    login: (username: string, password: string) => requests.post('/login', { username, password }),
    register: (username: string, password: string, role: Role) => requests.post('/users', { username, password, role }),
    logout: () => requests.post('/logout'),
    logoutAll: () => requests.post('/logout/all'),
    session: () => requests.post('/session'),
});

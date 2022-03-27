import { Requests } from '@mr/shared/data-access/superagent';

export enum Role {
    Admin = 'admin',
    Buyer = 'buyer',
    Seller = 'seller',
}
interface Coins {
    5?: number;
    10?: number;
    20?: number;
    50?: number;
    100?: number;
}
interface ICreateUserDto {
    username: string;
    password: string;
    role: Role;
}
interface IPublicUpdateUserDto {
    username: string;
    role: Role;
}
export const createUserApi = (requests: Requests) => ({
    all: () => requests.get('/users'),
    byId: (userId: string) => requests.get(`/users/${userId}`),
    update: (userId: string, updates: Partial<IPublicUpdateUserDto>) => requests.patch(`/users/${userId}`, updates),
    del: (userId: string) => requests.del(`/users/${userId}`),
    create: (user: ICreateUserDto) => requests.post('/users', user),
    deposit: (payload: Coins) => requests.post('/deposit', payload),
    reset: () => requests.post('/reset'),
});

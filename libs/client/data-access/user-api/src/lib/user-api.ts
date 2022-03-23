import type { Requests } from '@mr/shared/data-access/superagent';

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
    username?: string;
    role?: Role;
}
export const userApi = (requests: Requests) => ({
    all: () => requests.get('/users'),
    byId: (productId: string) => requests.get(`/users/${productId}`),
    update: (productId: string, updates: IPublicUpdateUserDto) => requests.patch(`/users/${productId}`, updates),
    del: (userId: string) => requests.del(`/users/${userId}`),
    create: (user: ICreateUserDto) => requests.post('/users', user),
    deposit: (payload: Coins) => requests.post('/deposit', payload),
});

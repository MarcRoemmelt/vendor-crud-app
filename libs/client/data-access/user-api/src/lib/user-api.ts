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
    all: <R>() => requests.get<R>('/users'),
    byId: <R>(userId: string) => requests.get<R>(`/users/${userId}`),
    update: <R, B extends Partial<IPublicUpdateUserDto> = Partial<IPublicUpdateUserDto>>(userId: string, updates: B) =>
        requests.patch<R, B>(`/users/${userId}`, updates),
    del: <R>(userId: string) => requests.del<R>(`/users/${userId}`),
    create: <R, B extends ICreateUserDto = ICreateUserDto>(user: B) => requests.post<R, B>('/users', user),
    deposit: <R, B extends Coins = Coins>(payload: B) => requests.post<R, B>('/deposit', payload),
    reset: <R>() => requests.post<R>('/reset'),
});

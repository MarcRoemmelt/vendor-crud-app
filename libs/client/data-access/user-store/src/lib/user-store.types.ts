export interface IUser {
    _id: string;
    username: string;
    deposit: Coins;
    role: Role;
}
export enum Role {
    Admin = 'admin',
    Buyer = 'buyer',
    Seller = 'seller',
}
export interface Coins {
    5?: number;
    10?: number;
    20?: number;
    50?: number;
    100?: number;
}

export interface IManageProfileFormValues {
    username: string;
    role: Role;
}

export interface IUserStoreState {
    currentUser: IUser;
    setCurrentUser(user: IUser): void;
    updateUser(user: IManageProfileFormValues): void;
}

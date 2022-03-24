import { Role } from '@mr/client/data-access/user-api';

export interface IRegisterFormValues {
    username: string;
    password: string;
    role: Role;
}

export interface ILoginFormValues {
    username: string;
    password: string;
}

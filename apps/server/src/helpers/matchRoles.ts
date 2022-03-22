import { Role } from '../enums/role.enum';

export function matchRoles(roles: string[], userRole: unknown) {
    return roles.some((role) => role === userRole) || userRole === Role.Admin;
}

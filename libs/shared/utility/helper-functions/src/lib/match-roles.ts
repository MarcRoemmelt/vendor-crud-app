export function matchRoles(roles: string[], userRole: unknown, adminRole?: string) {
    return roles.some((role) => role === userRole) || userRole === adminRole;
}

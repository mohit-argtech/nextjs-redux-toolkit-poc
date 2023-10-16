type UserRoleKey = 'SUPER_ADMIN' | 'ADMIN';
export type UserDetails = {
    id: number;
    username: string;
    email: string;
    role: UserRoleKey;
};
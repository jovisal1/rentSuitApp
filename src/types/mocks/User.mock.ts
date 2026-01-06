
import { Role, User } from '@/types/User';


// -----------------------------------------------------
// ROLES
// -----------------------------------------------------

export const roles: Role[] = [
    { id: 1, name: 'NORMAL', description: 'Standard user' },
    { id: 2, name: 'ADMIN', description: 'System administrator' },
];

// -----------------------------------------------------
// USERS
// -----------------------------------------------------

export const users: User[] = [
    {
        id: 1,
        roleId: 2,
        name: 'Main Admin',
        email: 'pvidalsalvador@gmail.com',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&auto=format&fit=crop&q=80',
    },
    {
        id: 2,
        roleId: 1,
        name: 'Operator 1',
        email: 'operator1@rentalapp.com',
        avatarUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=128&auto=format&fit=crop&q=80',
    },
];

export const mockPasswords: Record<number, string> = {
    1: '1234',
    2: 'operario',
};


const base64UrlEncode = (input: string) => {
    const base64 = globalThis.btoa ? globalThis.btoa(input) : input;
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
};

export const generateMockToken = (user: User): string => {
    const header = { alg: "none", typ: "JWT" };
    const payload = {
        sub: user.id,
        roleId: user.roleId,
        iat: Math.floor(Date.now() / 1000),
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));

    const signature = "aaaa";
    return `${encodedHeader}.${encodedPayload}.${signature}`;
};
import { AuthSession } from '@/src/services/auth.service';
import { Role, User } from '../User';

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
        email: 'admin@rentalapp.com',
    },
    {
        id: 2,
        roleId: 1,
        name: 'Operator 1',
        email: 'operator1@rentalapp.com',
    },
];

export const mockPasswords: Record<number, string> = {
    1: 'admin123',
    2: 'operario',
};


export const generateMockToken = (user: User): string => {
    const payload = {
        sub: user.id,
        roleId: user.roleId,
        iat: Date.now(),
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    return `mock.${base64Payload}.signature`;
};


import { roles, users, mockPasswords, generateMockToken } from "@/types/mocks/User.mock";
import type { Role, User } from "@/types/User";

export type AuthSession = {
    user: User;
    role: Role;
    token: string;
};

export type UpdateUserPayload = {
    id: number;
    name: string;
    email: string;
};

export const login = async (email: string, password: string): Promise<AuthSession> => {
    const user = users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
        throw new Error("Usuario o contraseña incorrectos.");
    }

    const expectedPassword = mockPasswords[user.id];
    if (expectedPassword !== password) {
        throw new Error("Usuario o contraseña incorrectos.");
    }

    const role = roles.find((item) => item.id === user.roleId);
    if (!role) {
        throw new Error("Rol no válido.");
    }

    const token = generateMockToken(user);
    return Promise.resolve({ user, role, token });
};

export const updateUserProfile = async (payload: UpdateUserPayload): Promise<User> => {
    const index = users.findIndex((item) => item.id === payload.id);
    if (index === -1) {
        throw new Error("Usuario no encontrado.");
    }

    const updatedUser = {
        ...users[index],
        name: payload.name.trim(),
        email: payload.email.trim(),
    };
    users[index] = updatedUser;
    return Promise.resolve(updatedUser);
};
import type { Role, User } from "@/types/User";
import { supabase } from "@/services/supabaseClient";

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
    const normalizedEmail = email.trim().toLowerCase();
    const { data, error } = await supabase
        .from("users")
        .select("id, role_id, name, email, avatar_url, roles ( id, name, description )")
        .eq("email", normalizedEmail)
        .maybeSingle();

    if (error || !data) {
        throw new Error("Usuario o contraseña incorrectos.");
    }

    if (!password) {
        throw new Error("Usuario o contraseña incorrectos.");
    }

    const roleData = Array.isArray(data.roles) ? data.roles[0] : data.roles;
    const role = roleData
        ? {
            id: roleData.id,
            name: roleData.name,
            description: roleData.description ?? undefined,
        }
        : null;

    if (!role) {
        throw new Error("Rol no válido.");
    }

    const user: User = {
        id: data.id,
        roleId: data.role_id,
        name: data.name,
        email: data.email,
        avatarUrl: data.avatar_url ?? undefined,
    };

    const token = `supabase-${data.id}-${Date.now()}`;
    return { user, role, token };
};

export const updateUserProfile = async (payload: UpdateUserPayload): Promise<User> => {
    const { data, error } = await supabase
        .from("users")
        .update({
            name: payload.name.trim(),
            email: payload.email.trim(),
        })
        .eq("id", payload.id)
        .select("id, role_id, name, email, avatar_url")
        .single();

    if (error || !data) {
        throw new Error("Usuario no encontrado.");
    }

    return {
        id: data.id,
        roleId: data.role_id,
        name: data.name,
        email: data.email,
        avatarUrl: data.avatar_url ?? undefined,
    };
};

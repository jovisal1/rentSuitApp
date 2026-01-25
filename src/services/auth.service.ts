import type { Role, User } from "@/types/User";
import { supabase } from "@/config/supabaseClient";
import { fetchProfileByAuthId } from "@/services/profile.service";
import { DEFAULT_ROLE_ID } from "@/utils/constants";

export type AuthSession = {
    user: User;
    role: Role;
    token: string;
};

export const login = async (email: string, password: string): Promise<AuthSession> => {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
    });

    if (authError || !authData.session || !authData.user) {
        throw new Error("Usuario o contraseña incorrectos.");
    }

    const { user, role } = await fetchProfileByAuthId(authData.user.id);

    return {
        user,
        role,
        token: authData.session.access_token,
    };
};

export const register = async (email: string, password: string): Promise<AuthSession> => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
    });

    if (authError || !authData.user) {
        throw new Error("No se pudo crear la cuenta.");
    }

    const authUserId = authData.user.id;
    const baseName = email.split("@")[0]?.trim() || "Nuevo usuario";

    const { error: profileError } = await supabase.from("users").insert({
        auth_user_id: authUserId,
        role_id: DEFAULT_ROLE_ID,
        name: baseName,
        email: email.trim(),
        avatar_url: null,
    });

    if (profileError) {
        throw new Error("No se pudo crear el perfil del usuario.");
    }

    if (!authData.session) {
        throw new Error("Revisa tu correo para confirmar la cuenta.");
    }

    const { user, role } = await fetchProfileByAuthId(authUserId);

    return {
        user,
        role,
        token: authData.session.access_token,
    };
};

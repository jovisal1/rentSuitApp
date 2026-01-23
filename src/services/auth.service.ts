import { File } from "expo-file-system";
import type { Role, User } from "@/types/User";
import { supabase } from "@/config/supabaseClient";

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

const AVATAR_BUCKET = "avatars";

type UserProfileRow = {
    id: number;
    role_id: number;
    name: string;
    email: string;
    avatar_url: string | null;
    roles:
        | { id: number; name: Role["name"]; description?: string | null }
        | Array<{ id: number; name: Role["name"]; description?: string | null }>;
};

const mapProfile = (data: UserProfileRow) => {
    const roleData = Array.isArray(data.roles) ? data.roles[0] : data.roles;
    const role: Role = {
        id: roleData.id,
        name: roleData.name,
        description: roleData.description ?? undefined,
    };

    return {
        user: {
            id: data.id,
            roleId: data.role_id,
            name: data.name,
            email: data.email,
            avatarUrl: data.avatar_url ?? undefined,
        },
        role,
    };
};

export const fetchProfileByAuthId = async (authUserId: string) => {
    const { data, error } = await supabase
        .from("users")
        .select("id, role_id, name, email, avatar_url, roles ( id, name, description )")
        .eq("auth_user_id", authUserId)
        .single();

    if (error || !data) {
        throw new Error("No se encontró el perfil del usuario.");
    }

    return mapProfile(data as UserProfileRow);
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
        role_id: 1,
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

export const uploadUserAvatar = async ({
    userId,
    fileUri,
    mimeType,
}: {
    userId: number;
    fileUri: string;
    mimeType?: string | null;
}): Promise<User> => {
    const extension = mimeType?.split("/")[1] ?? "jpg";
    const filePath = `user-${userId}.${extension}`;
    const file = new File(fileUri);
    const fileData = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
        .from(AVATAR_BUCKET)
        .upload(filePath, fileData, {
            upsert: true,
            contentType: mimeType ?? undefined,
        });

    if (uploadError) {
        throw new Error("No se pudo subir la imagen.");
    }

    const { data: publicData } = supabase.storage
        .from(AVATAR_BUCKET)
        .getPublicUrl(filePath);

    const { data, error } = await supabase
        .from("users")
        .update({ avatar_url: publicData.publicUrl })
        .eq("id", userId)
        .select("id, role_id, name, email, avatar_url")
        .single();

    if (error || !data) {
        throw new Error("No se pudo guardar el avatar.");
    }

    return {
        id: data.id,
        roleId: data.role_id,
        name: data.name,
        email: data.email,
        avatarUrl: data.avatar_url ?? undefined,
    };
};

import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import { useUserStore } from "@/stores/user.store";
import type { RoleName } from "@/types/User";

type UserAvatarAppProps = {
    size?: number;
    name?: string | null;
    avatarUrl?: string | null;
    roleName?: RoleName | null;
};

export function UserAvatarApp({
    size = 32,
    name,
    avatarUrl,
    roleName,
}: UserAvatarAppProps) {
    const theme = useTheme();
    const storeUser = useUserStore.use.user();
    const storeRole = useUserStore.use.role();

    const effectiveName = name ?? storeUser?.name ?? "U";
    const effectiveAvatarUrl = avatarUrl ?? storeUser?.avatarUrl ?? null;
    const effectiveRoleName = roleName ?? storeRole?.name ?? null;
    const isAdmin = effectiveRoleName === "ADMIN";

    const initials = useMemo(() => {
        return effectiveName
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase();
    }, [effectiveName]);

    const wrapperStyle = isAdmin
        ? {
              borderWidth: 2,
              borderColor: theme.colors.primary,
              borderRadius: size / 2 + 2,
              padding: 2,
          }
        : null;

    return (
        <View style={wrapperStyle}>
            {effectiveAvatarUrl ? (
                <Avatar.Image size={size} source={{ uri: effectiveAvatarUrl }} />
            ) : (
                <Avatar.Text
                    size={size}
                    label={initials || "--"}
                    style={[styles.avatarFallback, { backgroundColor: theme.colors.surfaceVariant }]}
                    labelStyle={[styles.avatarLabel, { color: theme.colors.primary }]}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    avatarFallback: {
        backgroundColor: "transparent",
    },
    avatarLabel: {
        fontWeight: "700",
    },
});

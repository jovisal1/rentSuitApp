import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { TextInputApp } from "@/components/TextInputApp";
import { ButtonApp } from "@/components/ButtonApp";
import { UserAvatarApp } from "@/components/UserAvatarApp";
import { useUserStore } from "@/stores/user.store";
import { updateUserProfile } from "@/services/auth.service";

export default function ProfileScreen() {
    const router = useRouter();
    const theme = useTheme();
    const { user, role, token, setUser } = useUserStore();
    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");

    const handleSave = async () => {
        if (!user) return;
        try {
            const updatedUser = await updateUserProfile({
                id: user.id,
                name,
                email,
            });
            setUser(updatedUser, role, token);
            router.back();
        } catch (e) {
            const message = e instanceof Error ? e.message : "No se pudo actualizar el perfil";
            Alert.alert("Error", message);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={22} color={theme.colors.primary} />
                </Pressable>
                <Text variant="titleMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
                    Mi perfil
                </Text>
            </View>

            <View style={styles.content}>
                <View style={styles.avatarRow}>
                    <UserAvatarApp
                        size={64}
                        name={name || user?.name}
                        avatarUrl={user?.avatarUrl}
                        roleName={role?.name}
                    />
                    <View>
                        <Text style={[styles.nameText, { color: theme.colors.onSurface }]}>
                            {name || "Sin nombre"}
                        </Text>
                        <Text style={[styles.roleText, { color: theme.colors.onSurfaceVariant }]}>
                            {role?.name ?? "Sin rol"}
                        </Text>
                    </View>
                </View>

                <TextInputApp label="Nombre" value={name} onChangeText={setName} />
                <TextInputApp
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <ButtonApp onPress={handleSave} style={styles.saveButton}>
                    Guardar cambios
                </ButtonApp>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontWeight: "700",
    },
    content: {
        gap: 12,
    },
    avatarRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 8,
    },
    nameText: {
        fontSize: 16,
        fontWeight: "700",
    },
    roleText: {
        fontSize: 12,
        marginTop: 2,
    },
    saveButton: {
        marginTop: 8,
    },
});

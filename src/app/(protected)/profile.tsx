import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { TextInputApp } from "@/components/TextInputApp";
import { ButtonApp } from "@/components/ButtonApp";
import { UserAvatarApp } from "@/components/UserAvatarApp";
import { useUserStore } from "@/stores/user.store";
import { updateUserProfile, uploadUserAvatar } from "@/services/auth.service";

export default function ProfileScreen() {
    const router = useRouter();
    const theme = useTheme();
    const { user, role, token, setUser } = useUserStore();
    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

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

    const handlePickAvatar = async () => {
        if (!user || isUploadingAvatar) return;
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.status !== "granted") {
            Alert.alert("Permiso requerido", "Necesitamos acceso a tus fotos para cambiar el avatar.");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (result.canceled || !result.assets?.[0]) return;

        try {
            setIsUploadingAvatar(true);
            const asset = result.assets[0];
            const updatedUser = await uploadUserAvatar({
                userId: user.id,
                fileUri: asset.uri,
                mimeType: asset.mimeType,
            });
            setUser(updatedUser, role, token);
        } catch (e) {
            const message = e instanceof Error ? e.message : "No se pudo subir el avatar";
            Alert.alert("Error", message);
        } finally {
            setIsUploadingAvatar(false);
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
                    <Pressable
                        style={styles.avatarButton}
                        onPress={handlePickAvatar}
                        disabled={isUploadingAvatar}
                    >
                        <UserAvatarApp
                            size={64}
                            name={name || user?.name}
                            avatarUrl={user?.avatarUrl}
                            roleName={role?.name}
                        />
                        <View style={styles.avatarEditBadge}>
                            <MaterialCommunityIcons
                                name="camera-outline"
                                size={14}
                                color={theme.colors.surface}
                            />
                        </View>
                    </Pressable>
                    <View style={styles.avatarInfo}>
                        <Text style={[styles.nameText, { color: theme.colors.onSurface }]}>
                            {name || "Sin nombre"}
                        </Text>
                        <Text style={[styles.roleText, { color: theme.colors.onSurfaceVariant }]}>
                            {role?.name ?? "Sin rol"}
                        </Text>
                        <Pressable onPress={handlePickAvatar} disabled={isUploadingAvatar}>
                            <Text style={[styles.avatarActionText, { color: theme.colors.primary }]}>
                                {isUploadingAvatar ? "Subiendo..." : "Cambiar foto"}
                            </Text>
                        </Pressable>
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
    avatarButton: {
        position: "relative",
    },
    avatarEditBadge: {
        position: "absolute",
        right: -2,
        bottom: -2,
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0F172A",
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },
    avatarInfo: {
        flex: 1,
        gap: 4,
    },
    nameText: {
        fontSize: 16,
        fontWeight: "700",
    },
    roleText: {
        fontSize: 12,
        marginTop: 2,
    },
    avatarActionText: {
        fontSize: 12,
        fontWeight: "600",
    },
    saveButton: {
        marginTop: 8,
    },
});

import { StyleSheet, View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    Avatar,
    Divider,
    Menu,
    Text,
    useTheme,
    Portal,
    Dialog,
    Button,
} from "react-native-paper";
import { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/stores/user.store";
import { AuthContext } from "@/providers/AuthProvider";

interface CustomHeaderProps {
    options: any;
    back?: { title?: string; href?: string };
}

export function HeaderApp({ options, back }: CustomHeaderProps) {
    const theme = useTheme();
    const router = useRouter();
    const user = useUserStore((state) => state.user);
    const styles = useStyles(theme);

    const [menuVisible, setMenuVisible] = useState(false);
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const [confirmVisible, setConfirmVisible] = useState(false);

    const authState = useContext(AuthContext);

    const openConfirmLogout = () => {
        closeMenu();
        // Importante: abrir el diálogo en el siguiente tick evita colisiones con el overlay del Menu
        setTimeout(() => setConfirmVisible(true), 0);
    };

    const cancelLogout = () => setConfirmVisible(false);

    const confirmLogout = async () => {
        setConfirmVisible(false);
        await authState.logOut(); // aquí haces tu clearUser + clearStorage + navegación
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.leftSection}>
                    {back ? (
                        <Pressable onPress={() => router.back()} style={styles.backButton}>
                            <MaterialCommunityIcons
                                name="arrow-left"
                                size={24}
                                color={theme.colors.primary}
                            />
                        </Pressable>
                    ) : (
                        <View style={styles.backButtonPlaceholder} />
                    )}

                    <View>
                        <Text variant="titleMedium" style={styles.headerTitle}>
                            {options.title || "RentSuit"}
                        </Text>
                        <Text variant="bodySmall" style={styles.headerSubtitle}>
                            Gestión y seguimiento
                        </Text>
                    </View>
                </View>

                <View style={styles.headerActions}>
                    <Pressable style={styles.iconButton}>
                        <MaterialCommunityIcons
                            name="bell-outline"
                            size={20}
                            color={theme.colors.primary}
                        />
                    </Pressable>

                    <Menu
                        visible={menuVisible}
                        onDismiss={closeMenu}
                        anchor={
                            <Pressable onPress={openMenu}>
                                {user?.avatarUrl ? (
                                    <Avatar.Image size={32} source={{ uri: user.avatarUrl }} />
                                ) : (
                                    <Avatar.Text
                                        size={32}
                                        label={(user?.name ?? "U").substring(0, 2).toUpperCase()}
                                    />
                                )}
                            </Pressable>
                        }
                    >
                        <Menu.Item
                            onPress={() => {
                                closeMenu();
                                router.push("/profile");
                            }}
                            title="Mi Perfil"
                        />
                        <Menu.Item
                            onPress={() => {
                                closeMenu();
                                router.push("/preferences");
                            }}
                            title="Ajustes"
                        />
                        <Divider />
                        <Menu.Item onPress={openConfirmLogout} title="Cerrar Sesión" />
                    </Menu>

                    <Portal>
                        <Dialog visible={confirmVisible} onDismiss={cancelLogout}>
                            <Dialog.Title>Cerrar sesión</Dialog.Title>
                            <Dialog.Content>
                                <Text>¿Seguro que quieres salir?</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={cancelLogout}>Cancelar</Button>
                                <Button onPress={confirmLogout}>Salir</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </View>
        </SafeAreaView>
    );
}

const useStyles = (theme) =>
    StyleSheet.create({
        safeArea: {
            backgroundColor: theme.colors.surface,
            shadowColor: theme.colors.shadow,
            elevation: 2,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            height: 50,
        },
        container: {
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
        },
        leftSection: {
            flexDirection: "row",
            alignItems: "center",
        },
        backButton: {
            marginRight: 12,
            width: 32,
            height: 32,
            alignItems: "center",
            justifyContent: "center",
        },
        backButtonPlaceholder: {
            marginRight: 12,
            width: 32,
            height: 32,
        },
        headerTitle: {
            fontWeight: "700",
            color: theme.colors.primary,
            lineHeight: 20,
        },
        headerSubtitle: {
            color: theme.colors.onSurfaceVariant,
            marginTop: -2,
        },
        headerActions: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
        },
        iconButton: {
            padding: 4,
        },
    });

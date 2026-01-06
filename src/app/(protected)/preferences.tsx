import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Switch, Text, useTheme } from "react-native-paper";
import { useThemeContext } from "@/providers/ThemeProvider";

export default function PreferencesScreen() {
    const router = useRouter();
    const theme = useTheme();
    const { isDark, setIsDark } = useThemeContext();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={22} color={theme.colors.primary} />
                </Pressable>
                <Text variant="titleMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
                    Preferencias
                </Text>
            </View>

            <View
                style={[
                    styles.card,
                    { backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant },
                ]}
            >
                <View style={styles.row}>
                    <View>
                        <Text style={styles.rowTitle}>Tema oscuro</Text>
                        <Text style={[styles.rowSubtitle, { color: theme.colors.onSurfaceVariant }]}>
                            Activa el modo oscuro en la app.
                        </Text>
                    </View>
                    <Switch value={isDark} onValueChange={setIsDark} />
                </View>
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
    card: {
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    },
    rowTitle: {
        fontSize: 14,
        fontWeight: "700",
    },
    rowSubtitle: {
        fontSize: 12,
        marginTop: 4,
    },
});
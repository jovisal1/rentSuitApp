import { StyleSheet } from "react-native";
import type { MD3Theme } from "react-native-paper";

export const getEmptyStateStyles = (theme: MD3Theme) =>
    StyleSheet.create({
        emptyContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
            gap: 8,
            paddingHorizontal: 16,
        },
        emptyText: {
            color: theme.colors.onSurfaceVariant,
            fontSize: 13,
            marginTop: 8,
            textAlign: "center",
        },
    });

export const getCompactEmptyStateStyles = (theme: MD3Theme) =>
    StyleSheet.create({
        emptyContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
        },
        emptyText: {
            color: theme.colors.onSurfaceVariant,
            fontSize: 13,
            marginTop: 8,
        },
    });
import { StyleSheet } from "react-native";
import type { MD3Theme } from "react-native-paper";


export const getOrdersHeaderStyle = (theme: MD3Theme) =>
    StyleSheet.create({
        header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8, backgroundColor: theme.colors.background },
        topBar: { flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center" },
        searchInput: {
            backgroundColor: theme.colors.surfaceVariant,
            height: 45,
            fontSize: 14,
            flex: 1,
        },
        filtersButton: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            borderWidth: 1,
            borderColor: theme.colors.outline,
            borderRadius: 10,
            paddingVertical: 12,
            paddingHorizontal: 12,
            backgroundColor: theme.colors.surface,
        },
        filtersButtonText: {
            fontWeight: "700",
        },
    });

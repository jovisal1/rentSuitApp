import { StyleSheet } from "react-native";
import type { MD3Theme } from "react-native-paper";

export const getCustomerSelectFieldStyles = (theme: MD3Theme) =>
    StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: "rgba(15, 23, 42, 0.4)",
        },
        sheet: {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            maxHeight: "70%",
            backgroundColor: theme.colors.background,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingHorizontal: 16,
            paddingTop: 14,
            paddingBottom: 18,
            gap: 12,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        title: {
            fontSize: 16,
            fontWeight: "800",
            color: theme.colors.onSurface,
        },
        fieldLabel: {
            fontSize: 12,
            fontWeight: "700",
            color: theme.colors.onSurface,
            marginBottom: 6,
        },
        selectField: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 12,
        },
        selectText: {
            fontSize: 13,
            fontWeight: "600",
            color: theme.colors.onSurface,
        },
        closeButton: {
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.surfaceVariant,
        },
        searchInput: {
            backgroundColor: theme.colors.surfaceVariant,
        },
        emptyText: {
            textAlign: "center",
            color: theme.colors.onSurfaceVariant,
            fontSize: 13,
            paddingVertical: 12,
        },
        row: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 10,
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.outlineVariant,
            marginBottom: 8,
        },
        rowSelected: {
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.surfaceVariant,
        },
        rowInfo: {
            flex: 1,
            marginRight: 8,
        },
        rowName: {
            fontSize: 14,
            fontWeight: "700",
            color: theme.colors.onSurface,
        },
        rowMeta: {
            fontSize: 12,
            color: theme.colors.onSurfaceVariant,
            marginTop: 2,
        },
    });

import { StyleSheet } from "react-native";
import type { MD3Theme } from "react-native-paper";


export const getOrderFiltersModalStyles = (theme: MD3Theme) =>
    StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: theme.colors.backdrop,
        },

        sheet: {
            backgroundColor: theme.colors.surface,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            paddingBottom: 12,
            borderTopWidth: 1,
            borderColor: theme.colors.outlineVariant,
        },

        sheetHeader: {
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        sheetTitle: {
            fontSize: 16,
            fontWeight: "800",
        },
        closeIcon: {
            width: 36,
            height: 36,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
        },

        sheetContent: {
            paddingHorizontal: 16,
            gap: 12,
            paddingBottom: 10,
        },

        row: { gap: 8 },
        label: {
            color: theme.colors.onSurface,
            fontWeight: "700",
        },

        statusPills: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
        pill: {
            borderWidth: 1,
            borderColor: theme.colors.outline,
            borderRadius: 999,
            paddingVertical: 8,
            paddingHorizontal: 12,
        },
        pillText: { color: theme.colors.onSurface, fontWeight: "600" },

        sheetActions: {
            paddingHorizontal: 16,
            paddingTop: 10,
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 10,
        },

        secondaryBtn: {
            borderWidth: 1,
            borderColor: theme.colors.outline,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 14,
            backgroundColor: theme.colors.surface,
        },
        secondaryBtnText: { color: theme.colors.onSurface, fontWeight: "700" },

        primaryBtn: {
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 14,
        },
        primaryBtnText: {
            color: theme.colors.onPrimary,
            fontWeight: "800",
        },
    });
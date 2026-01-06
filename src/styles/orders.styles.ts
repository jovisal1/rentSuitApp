import { StyleSheet } from "react-native";
import type { MD3Theme } from "react-native-paper";

export const getOrderRowStyles = (theme: MD3Theme) =>
    StyleSheet.create({
        row: {
            backgroundColor: theme.colors.surface,
            marginHorizontal: 16,
            marginVertical: 8,
            padding: 16,
            borderRadius: 5,
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 3,
        },
        rowHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 12,
        },
        codeContainer: {
            gap: 2,
        },
        codeLabel: {
            fontSize: 10,
            fontWeight: "600",
            color: theme.colors.onSurfaceVariant,
            letterSpacing: 0.5,
        },
        codeValue: {
            fontSize: 16,
            fontWeight: "700",
            color: theme.colors.onSurface,
        },
        statusBadge: {
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 8,
        },
        statusText: {
            fontSize: 11,
            fontWeight: "800",
        },
        divider: {
            height: 1,
            backgroundColor: theme.colors.outlineVariant,
            marginVertical: 12,
        },
        footer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        dateGroup: {
            flex: 1,
        },
        dateLabel: {
            fontSize: 10,
            color: theme.colors.onSurfaceVariant,
            marginBottom: 2,
            textTransform: "uppercase",
        },
        dateText: {
            fontSize: 13,
            fontWeight: "600",
            color: theme.colors.onSurface,
        },
        arrow: {
            paddingHorizontal: 15,
            color: theme.colors.outlineVariant,
            fontSize: 18,
        },
    });

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
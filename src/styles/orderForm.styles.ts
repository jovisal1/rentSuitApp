import { StyleSheet } from "react-native";
import type { MD3Theme } from "react-native-paper";

export const getOrderFormStyles = (theme: MD3Theme) =>
    StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        content: {
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 24,
            gap: 14,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 6,
        },
        title: {
            fontSize: 18,
            fontWeight: "800",
            color: theme.colors.onSurface,
        },
        closeButton: {
            width: 32,
            height: 32,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 16,
            backgroundColor: theme.colors.surfaceVariant,
        },
        sectionLabel: {
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
        dateRow: {
            flexDirection: "row",
            gap: 12,
        },
        dateColumn: {
            flex: 1,
        },
        dateField: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: theme.colors.surface,
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: theme.colors.outlineVariant,
        },
        dateText: {
            fontSize: 12,
            fontWeight: "600",
            color: theme.colors.onSurface,
        },
        productsHeader: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 4,
        },
        addProductButton: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            backgroundColor: theme.colors.onSurface,
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
        },
        addProductText: {
            color: theme.colors.surface,
            fontWeight: "700",
            fontSize: 12,
        },
        productCard: {
            backgroundColor: theme.colors.surface,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.colors.outlineVariant,
            padding: 12,
            gap: 10,
        },
        productRow: {
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 8,
        },
        productColumn: {
            flex: 1.2,
        },
        priceColumn: {
            flex: 0.9,
        },
        daysColumn: {
            flex: 0.7,
        },
        fieldLabel: {
            fontSize: 11,
            fontWeight: "700",
            color: theme.colors.onSurfaceVariant,
            marginBottom: 6,
        },
        productSelect: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: 8,
            paddingVertical: 8,
            paddingHorizontal: 10,
        },
        inputCompact: {
            height: 36,
            backgroundColor: theme.colors.surfaceVariant,
        },
        deleteButton: {
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 18,
        },
        sizesBlock: {
            gap: 8,
        },
        sizesLabel: {
            fontSize: 11,
            fontWeight: "700",
            color: theme.colors.onSurfaceVariant,
        },
        sizesRow: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
        },
        sizeChip: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 20,
            backgroundColor: theme.colors.surfaceVariant,
        },
        sizeChipText: {
            fontSize: 12,
            fontWeight: "700",
            color: theme.colors.onSurface,
        },
        sizeChipQty: {
            minWidth: 18,
            textAlign: "center",
            fontSize: 12,
            fontWeight: "700",
            color: theme.colors.onSurface,
        },
        addSizeChip: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.colors.outlineVariant,
            backgroundColor: theme.colors.surface,
        },
        notesInput: {
            minHeight: 70,
            backgroundColor: theme.colors.surfaceVariant,
        },
        footer: {
            flexDirection: "row",
            gap: 12,
            paddingHorizontal: 16,
            paddingBottom: 16,
        },
        footerButton: {
            flex: 1,
            paddingVertical: 12,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            elevation: 3,
        },
        cancelButton: {
            backgroundColor: "#F0F1F5",
        },
        cancelText: {
            fontWeight: "700",
            color: theme.colors.primary,
        },
        saveButton: {
            backgroundColor: theme.colors.primary,
        },
        saveText: {
            fontWeight: "800",
            color: theme.colors.surface,
        },
    });

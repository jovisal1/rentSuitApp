import { StyleSheet } from "react-native";
import type { MD3Theme } from "react-native-paper";

export const getOrderRowStyles = (theme: MD3Theme) =>
    StyleSheet.create({
        row: {
            backgroundColor: theme.colors.surface,
            marginHorizontal: 16,
            marginVertical: 8,
            padding: 16,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: theme.colors.outlineVariant,
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
            gap: 12,
        },
        headerLeft: { flex: 1 },
        codeLabel: {
            fontSize: 10,
            fontWeight: "600",
            color: theme.colors.onSurfaceVariant,
            letterSpacing: 0.5,
        },
        codeRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 4,
        },
        codeValue: {
            fontSize: 18,
            fontWeight: "800",
            color: theme.colors.onSurface,
        },
        statusBadge: {
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
        },
        statusText: {
            fontSize: 11,
            fontWeight: "800",
        },
        customerName: {
            marginTop: 6,
            fontSize: 13,
            fontWeight: "500",
            color: theme.colors.onSurfaceVariant,
        },
        actions: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            paddingTop: 4,
        },
        divider: {
            height: 1,
            backgroundColor: theme.colors.outlineVariant,
            marginVertical: 12,
        },
        datesRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 12,
        },
        dateGroup: {
            flex: 1,
        },
        dateGroupEnd: {
            alignItems: "flex-end",
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
        summaryRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        summaryText: {
            fontSize: 13,
            color: theme.colors.onSurfaceVariant,
            fontWeight: "500",
        },
        amountText: {
            fontSize: 16,
            fontWeight: "800",
            color: theme.colors.onSurface,
        },
        noteText: {
            fontSize: 12,
            color: theme.colors.onSurfaceVariant,
        },
    });
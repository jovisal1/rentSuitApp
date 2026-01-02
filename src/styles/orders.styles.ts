import { StyleSheet } from "react-native";
import { themeApp } from "../theme";

export const orderRowStyles = StyleSheet.create({
    row: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 5,
        shadowColor: "#000",
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
        color: "#999",
        letterSpacing: 0.5,
    },
    codeValue: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1A1A1A",
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
        backgroundColor: "#F0F0F0",
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
        color: "#AAA",
        marginBottom: 2,
        textTransform: 'uppercase',
    },
    dateText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#444",
    },
    arrow: {
        paddingHorizontal: 15,
        color: "#CCC",
        fontSize: 18,
    }
});

export const orderFiltersModalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
    },

    sheet: {
        backgroundColor: "#FFF",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        paddingBottom: 12,
        borderTopWidth: 1,
        borderColor: "#EEE",
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
        color: themeApp.colors.primary,
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
        color: "#333",
        fontWeight: "700",
    },

    statusPills: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    pill: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 999,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    pillText: { color: "#333", fontWeight: "600" },

    sheetActions: {
        paddingHorizontal: 16,
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
    },

    secondaryBtn: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: "#FFF",
    },
    secondaryBtnText: { color: "#333", fontWeight: "700" },

    primaryBtn: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
    },
    primaryBtnText: {
        color: (themeApp as any)?.colors?.onPrimary ?? "#FFF",
        fontWeight: "800",
    },
});

export const ordersHeaderStyle = StyleSheet.create({
    header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
    topBar: { flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center" },
    searchInput: {
        backgroundColor: "#eaebec",
        height: 45,
        fontSize: 14,
        flex: 1,
    },
    filtersButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: "#FFF",
    },
    filtersButtonText: {
        color: themeApp.colors.primary,
        fontWeight: "700",
    },
});
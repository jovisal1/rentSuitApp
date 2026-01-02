import { StyleSheet } from "react-native";

export const emptyStateStyles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        gap: 8,
        paddingHorizontal: 16,
    },
    emptyText: {
        color: "#BBB",
        fontSize: 13,
        marginTop: 8,
        textAlign: "center",
    }
});

export const compactEmptyStateStyles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    emptyText: {
        color: "#BBB",
        fontSize: 13,
        marginTop: 8,
    },
});

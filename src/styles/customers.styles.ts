import { StyleSheet } from "react-native";

export const customerInfoStyle = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FBFBFC" },
    fixedHeader: {
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
        zIndex: 10,
    },

    headerSection: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 15,
        marginBottom: 15,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    avatarContainer: { position: "relative" },
    statusIndicator: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: "#FFF",
    },
    infoTextContainer: { marginLeft: 15 },
    userNameText: { fontSize: 17, fontWeight: "700", color: "#1A1A1A" },
    userSubText: { fontSize: 12, color: "#999" },

    segmentedControlWrapper: { paddingHorizontal: 16, marginBottom: 10 },
    segmentedControlBackground: {
        flexDirection: "row",
        backgroundColor: "#F0F1F5",
        borderRadius: 8,
        padding: 2,
    },
    segmentItem: { flex: 1, paddingVertical: 7, alignItems: "center", borderRadius: 6 },
    segmentItemActive: { backgroundColor: "#FFF", elevation: 1 },
    segmentText: { fontSize: 12, color: "#888" },

    scrollArea: { flex: 1 },
    scrollContent: { padding: 12, paddingBottom: 100, flexGrow: 1 },

});


export const customerCardStyle = StyleSheet.create({
    itemCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
    },
    statusBar: {
        width: 3,
        height: "100%",
        backgroundColor: "#6dd3a2",
        borderRadius: 3,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    itemText: {
        flex: 1,
    },
    itemRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
});

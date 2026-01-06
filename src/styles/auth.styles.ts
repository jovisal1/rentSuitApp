import { StyleSheet } from "react-native";
export const authScreenStyles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 24, justifyContent: "center" },
    card: { borderRadius: 10, paddingVertical: 8 },
    logoBadge: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginBottom: 16,
        alignSelf: "flex-start",
    },
    greeting: { fontWeight: "600", marginBottom: -8 },
    title: { marginBottom: 12, fontWeight: "700" },
    helperRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
    resetRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
    subtleText: {},
    submitLabel: { fontSize: 16, letterSpacing: 0.5 },
    divider: { marginVertical: 16 },
    socialHint: { textAlign: "center", marginBottom: 12 },
    socialRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 4,
    },
    socialButton: { flex: 1, borderRadius: 5 },
    socialLabel: { letterSpacing: 0.2 },
    helperLink: { textTransform: "none", fontWeight: "600" },
});

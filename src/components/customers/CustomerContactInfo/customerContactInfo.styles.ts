import { StyleSheet } from "react-native";

export const getCustomerContactInfoStyles = () =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#FFF",
            borderRadius: 12,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: "#F0F0F0",
            paddingBottom: 10,
        },
        sectionHeader: { marginTop: 12, marginBottom: 4, paddingLeft: 2 },
        sectionTitle: {
            fontSize: 10,
            fontWeight: "800",
            color: "#06305f",
            textTransform: "uppercase",
            opacity: 0.5,
        },
        notesContainer: { marginTop: 12 },
        notesHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
        labelTitleNotes: {
            fontSize: 10,
            color: "#A0A0A0",
            textTransform: "uppercase",
            letterSpacing: 0.3,
            marginLeft: 8,
        },
        valueTextNotes: { fontSize: 14, color: "#555", lineHeight: 20, paddingLeft: 4 },
        textArea: {
            height: 100,
            backgroundColor: "#FFF",
            fontSize: 14,
            textAlignVertical: "top",
            marginTop: 4,
        },
    });

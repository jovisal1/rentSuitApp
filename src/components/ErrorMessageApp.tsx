import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, Text } from "react-native";


export default function ErrorMessageApp({ errorMessage }) {
    return (
        <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="alert-circle-outline" size={40} color="#DDD" />
            <Text style={styles.emptyText}>{errorMessage}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
    },
});

import { ActivityIndicator, View, StyleSheet, Text } from "react-native";


export default function LoadingDataIndicatorApp({ message }) {
    return (
        <View style={styles.emptyContainer}>
            <ActivityIndicator />
            <Text style={styles.emptyText}>{message}</Text>
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

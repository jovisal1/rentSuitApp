import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";



export function CustomerOrders() {

    return (
        <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="package-variant" size={40} color="#DDD" />
            <Text style={styles.emptyText}>No se han registrado pedidos</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 },
    emptyText: { color: '#BBB', fontSize: 13, marginTop: 8 },
});
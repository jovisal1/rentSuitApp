import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { compactEmptyStateStyles } from "../../styles/common.styles";



export function CustomerOrders() {

    return (
        <View style={compactEmptyStateStyles.emptyContainer}>
            <MaterialCommunityIcons name="package-variant" size={40} color="#DDD" />
            <Text style={compactEmptyStateStyles.emptyText}>No se han registrado pedidos</Text>
        </View>
    );
}

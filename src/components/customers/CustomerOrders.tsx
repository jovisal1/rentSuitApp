import React, { useMemo } from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getCompactEmptyStateStyles } from "../../styles/common.styles";



export function CustomerOrders() {
    const theme = useTheme();
    const emptyStyles = useMemo(() => getCompactEmptyStateStyles(theme), [theme]);

    return (
        <View style={emptyStyles.emptyContainer}>
            <MaterialCommunityIcons
                name="package-variant"
                size={40}
                color={theme.colors.onSurfaceVariant}
            />
            <Text style={emptyStyles.emptyText}>No se han registrado pedidos</Text>
        </View>
    );
}
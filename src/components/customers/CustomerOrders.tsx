import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getCompactEmptyStateStyles } from "@/styles/common.styles";
import OrderRow from "@/components/orders/OrderRow";
import LoadingDataIndicatorApp from "@/components/LoadingDataIndicatorApp";
import ErrorMessageApp from "@/components/ErrorMessageApp";
import { useOrdersByCustomerQuery } from "@/hooks/queries/useOrdersByCustomerQuery";

type CustomerOrdersProps = {
    customerId: number;
    customerName?: string;
};

export function CustomerOrders({ customerId, customerName }: CustomerOrdersProps) {
    const theme = useTheme();
    const emptyStyles = useMemo(() => getCompactEmptyStateStyles(theme), [theme]);
    const {
        data: orders = [],
        isLoading,
        isError,
        error,
    } = useOrdersByCustomerQuery(customerId, Number.isFinite(customerId));

    if (isLoading) {
        return <LoadingDataIndicatorApp message="Cargando pedidos..." />;
    }

    if (isError) {
        const message =
            error instanceof Error ? error.message : "No se pudieron cargar los pedidos.";
        return <ErrorMessageApp errorMessage={message} />;
    }

    if (orders.length === 0) {
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

    return (
        <View style={styles.list}>
            {orders.map((order) => (
                <OrderRow key={order.id} order={order} customerName={customerName} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        gap: 8,
        paddingBottom: 16,
    },
});

import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getCompactEmptyStateStyles } from "@/styles/common.styles";
import { getOrdersByCustomerId } from "@/services/oderService";
import { Order } from "@/types/Order";
import OrderRow from "@/components/orders/OrderRow";
import LoadingDataIndicatorApp from "@/components/LoadingDataIndicatorApp";
import ErrorMessageApp from "@/components/ErrorMessageApp";

type CustomerOrdersProps = {
    customerId: number;
};

export function CustomerOrders({ customerId }: CustomerOrdersProps) {
    const theme = useTheme();
    const emptyStyles = useMemo(() => getCompactEmptyStateStyles(theme), [theme]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadOrders = async () => {
            try {
                setErrorMessage(null);
                setIsLoading(true);
                const data = await getOrdersByCustomerId(customerId);
                if (!isMounted) return;
                setOrders(data);
            } catch {
                if (!isMounted) return;
                setErrorMessage("No se pudieron cargar los pedidos.");
            } finally {
                if (!isMounted) return;
                setIsLoading(false);
            }
        };

        loadOrders();

        return () => {
            isMounted = false;
        };
    }, [customerId]);

    if (isLoading) {
        return <LoadingDataIndicatorApp message="Cargando pedidos..." />;
    }

    if (errorMessage) {
        return <ErrorMessageApp errorMessage={errorMessage} />;
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
                <OrderRow key={order.id} order={order} />
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

import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Order, OrderStatus } from "../../../types/Order";
import { getOrders } from "../../../services/oderService";
import OrderRow from "../../../components/orders/OrderRow";
import { themeApp } from "../../../theme";
import LoadingDataIndicatorApp from "../../../components/LoadingDataIndicatorApp";
import ErrorMessageApp from "../../../components/ErrorMessageApp";
import OrdersFiltersModal from "../../../components/orders/OrdersFiltersModal";
import OrdersHeader from "../../../components/orders/OrdersHeader";
import { useOrderFilters } from "../../../hooks/useOrderFilters";
import { emptyStateStyles } from "../../../styles/common.styles";

export default function OrdersScreen() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const {
        filtersOpen,
        text,
        startDateFrom,
        endDateTo,
        status,
        filteredOrders,
        activeAdvancedCount,
        setFiltersOpen,
        setText,
        setStartDateFrom,
        setEndDateTo,
        setStatus,
        clearAdvancedFilters,
        clearAllFilters,
    } = useOrderFilters(orders);

    useEffect(() => {
        let isMounted = true;

        const loadOrders = async () => {
            try {
                setErrorMessage(null);
                setIsLoading(true);

                const data = await getOrders();
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
    }, []);


    if (isLoading) {
        return <LoadingDataIndicatorApp message="Cargando pedidos..." />;
    }

    if (errorMessage) {
        return <ErrorMessageApp errorMessage={errorMessage} />;
    }

    const showEmpty = filteredOrders.length === 0;

    return (
        <View style={{ flex: 1 }}>
            <OrdersHeader
                text={text}
                onChangeText={setText}
                activeFiltersCount={activeAdvancedCount}
                onOpenFilters={() => setFiltersOpen(true)}
            />

            {showEmpty ? (
                <View style={emptyStateStyles.emptyContainer}>
                    <MaterialCommunityIcons name="package-variant" size={40} color="#DDD" />
                    <Text style={emptyStateStyles.emptyText}>
                        {activeAdvancedCount || text
                            ? "No hay pedidos con los filtros actuales."
                            : "No hay pedidos para mostrar."}
                    </Text>

                    {activeAdvancedCount || text ? (
                        <Pressable style={styles.linkButton} onPress={clearAllFilters}>
                            <Text style={styles.linkButtonText}>Quitar filtros</Text>
                        </Pressable>
                    ) : null}
                </View>
            ) : (
                <FlatList
                    data={filteredOrders}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <OrderRow order={item} />}
                    contentContainerStyle={{ paddingBottom: 12 }}
                />
            )}

            <OrdersFiltersModal
                visible={filtersOpen}
                onClose={() => setFiltersOpen(false)}
                startDateFrom={startDateFrom}
                endDateTo={endDateTo}
                status={status}
                onChangeStartDate={setStartDateFrom}
                onChangeEndDate={setEndDateTo}
                onChangeStatus={setStatus}
                onClear={clearAdvancedFilters}
                onApply={() => setFiltersOpen(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    linkButton: {
        marginTop: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#DDD",
        backgroundColor: "#FFF",
    },
    linkButtonText: {
        color: themeApp.colors.primary,
        fontWeight: "700",
    },
});

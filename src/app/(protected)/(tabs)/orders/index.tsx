import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import { Order, OrderStatus } from "@/types/Order";
import { getOrders } from "@/services/oderService";
import OrderRow from "@/components/orders/OrderRow";
import LoadingDataIndicatorApp from "@/components/LoadingDataIndicatorApp";
import ErrorMessageApp from "@/components/ErrorMessageApp";
import OrdersFiltersModal from "@/components/orders/OrdersFiltersModal";
import OrdersHeader from "@/components/orders/OrdersHeader";
import { useOrderFilters } from "@/hooks/useOrderFilters";
import { getEmptyStateStyles } from "@/styles/common.styles";


export default function OrdersScreen() {
    const theme = useTheme();
    const emptyStyles = useMemo(() => getEmptyStateStyles(theme), [theme]);
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
                <View style={emptyStyles.emptyContainer}>
                    <MaterialCommunityIcons
                        name="package-variant"
                        size={40}
                        color={theme.colors.onSurfaceVariant}
                    />
                    <Text style={emptyStyles.emptyText}>
                        {activeAdvancedCount || text
                            ? "No hay pedidos con los filtros actuales."
                            : "No hay pedidos para mostrar."}
                    </Text>

                    {activeAdvancedCount || text ? (
                        <Pressable
                            style={[
                                styles.linkButton,
                                {
                                    backgroundColor: theme.colors.surface,
                                    borderColor: theme.colors.outlineVariant,
                                },
                            ]}
                            onPress={clearAllFilters}
                        >
                            <Text style={[styles.linkButtonText, { color: theme.colors.primary }]}>
                                Quitar filtros
                            </Text>
                        </Pressable>
                    ) : null}
                </View>
            ) : (
                <FlatList
                    data={filteredOrders}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <OrderRow order={item} />}
                    contentContainerStyle={[
                        styles.listContent,
                        { backgroundColor: theme.colors.background },
                    ]}
                    removeClippedSubviews={true}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
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
    },
    linkButtonText: {
        fontWeight: "700",
    },
    listContent: {
        paddingBottom: 32,
    },
});

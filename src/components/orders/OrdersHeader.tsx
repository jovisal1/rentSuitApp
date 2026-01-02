import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { themeApp } from "../../theme";
import { SearchInputApp } from "../SearchInputApp";
import { ordersHeaderStyle } from "../../styles/orders.styles";

interface OrdersHeaderProps {
    text: string;
    onChangeText: (value: string) => void;
    activeFiltersCount: number;
    onOpenFilters: () => void;
}

export default function OrdersHeader({
    text,
    onChangeText,
    activeFiltersCount,
    onOpenFilters,
}: OrdersHeaderProps) {
    return (
        <View style={ordersHeaderStyle.header}>
            <View style={ordersHeaderStyle.topBar}>
                <SearchInputApp
                    value={text}
                    onChangeText={onChangeText}
                    placeholder="Buscar pedidos..."
                    style={ordersHeaderStyle.searchInput}
                />

                <Pressable style={ordersHeaderStyle.filtersButton} onPress={onOpenFilters}>
                    <MaterialCommunityIcons
                        name="tune-variant"
                        size={18}
                        color={themeApp.colors.primary}
                    />
                    <Text style={ordersHeaderStyle.filtersButtonText}>
                        Filtros{activeFiltersCount ? ` (${activeFiltersCount})` : ""}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}



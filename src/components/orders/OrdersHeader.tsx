import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { SearchInputApp } from "../SearchInputApp";
import { getOrdersHeaderStyle } from "../../styles/orders.styles";

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
    const theme = useTheme();
    const styles = useMemo(() => getOrdersHeaderStyle(theme), [theme]);

    return (
        <View style={styles.header}>
            <View style={styles.topBar}>
                <SearchInputApp
                    value={text}
                    onChangeText={onChangeText}
                    placeholder="Buscar pedidos..."
                    style={styles.searchInput}
                />

                <Pressable style={styles.filtersButton} onPress={onOpenFilters}>
                    <MaterialCommunityIcons
                        name="tune-variant"
                        size={18}
                        color={theme.colors.primary}
                    />
                    <Text style={[styles.filtersButtonText, { color: theme.colors.primary }]}>
                        Filtros{activeFiltersCount ? ` (${activeFiltersCount})` : ""}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
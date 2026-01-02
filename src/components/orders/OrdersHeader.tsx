import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { themeApp } from "../../theme";
import { SearchInputApp } from "../SearchInputApp";

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
                        color={themeApp.colors.primary}
                    />
                    <Text style={styles.filtersButtonText}>
                        Filtros{activeFiltersCount ? ` (${activeFiltersCount})` : ""}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
    topBar: { flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center" },
    searchInput: {
        backgroundColor: "#eaebec",
        height: 45,
        fontSize: 14,
        flex: 1,
    },
    filtersButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: "#FFF",
    },
    filtersButtonText: {
        color: themeApp.colors.primary,
        fontWeight: "700",
    },
});

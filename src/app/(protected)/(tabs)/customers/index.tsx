import { useCallback, useMemo, useState } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { FlatList, StyleSheet, View } from "react-native";
import { FAB, Portal, useTheme } from "react-native-paper";
import { router } from "expo-router";
import CustomerCardApp from "@/components/customers/CustomerCardApp";
import { getCustomers } from "@/services/customerService";
import { Customer } from "@/types/Customer";
import { SearchInputApp } from "@/components/SearchInputApp";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function CustomersScreen() {
    const theme = useTheme();
    const tabBarHeight = useBottomTabBarHeight();
    const { bottom } = useSafeAreaInsets();
    const isFocused = useIsFocused();
    const [search, setSearch] = useState("");
    const [customers, setCustomers] = useState<Customer[]>([]);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            const loadCustomers = async () => {
                const data = await getCustomers();
                if (isActive) {
                    setCustomers([...data]);
                }
            };

            loadCustomers();
            return () => {
                isActive = false;
            };
        }, [])
    );

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return customers;
        return customers.filter(
            (c) =>
                c.name.toLowerCase().includes(term) ||
                (c.email?.toLowerCase().includes(term) ?? false) ||
                (c.phone?.toLowerCase().includes(term) ?? false)
        );
    }, [customers, search]);

    return (

        <View style={{ flex: 1 }}>
            <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
                <View style={styles.topBar}>
                    <SearchInputApp
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Buscar clientes..."
                        style={[styles.searchInput, { backgroundColor: theme.colors.surfaceVariant }]}
                    />
                </View>
            </View>
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CustomerCardApp customer={item} />
                )}
                contentContainerStyle={[styles.listContent, { backgroundColor: theme.colors.background }]}
                removeClippedSubviews={true}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
            />
            {isFocused && (
                <Portal>
                    <FAB
                        icon="plus"
                        style={[
                            styles.fab,
                            {
                                backgroundColor: theme.colors.primary,
                                bottom: tabBarHeight + bottom,
                            },
                        ]}
                        color="white"
                        onPress={() => router.push("/customers/new")}
                        accessibilityLabel="Crear cliente"
                    />
                </Portal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    listContent: {
        paddingBottom: 32,
        paddingHorizontal: 16,
    },

    searchInput: {
        height: 45,
        fontSize: 14,
        flex: 1,
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
    },
    topBar: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    fab: {
        position: "absolute",
        right: 20,
        borderRadius: 30,
        elevation: 3,
    },
});

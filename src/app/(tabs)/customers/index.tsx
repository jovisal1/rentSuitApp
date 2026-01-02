import { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import CustomerCardApp from "../../../components/customers/CustomerCardApp";
import { getCustomers } from "../../../services/customerService";
import { Customer } from "../../../types/Customer";
import { SearchInputApp } from "../../../components/SearchInputApp";


export default function CustomersScreen() {
    const theme = useTheme();
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
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CustomerCardApp customer={item} />
                )}
                contentContainerStyle={styles.listContent}
                removeClippedSubviews={true}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                ListHeaderComponent={
                    <View style={styles.searchWrapper}>
                        <SearchInputApp
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Buscar clientes..."
                            style={styles.searchInput}
                        />
                    </View>
                }
                stickyHeaderIndices={[0]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    listContent: {
        paddingBottom: 32,
        paddingHorizontal: 16,
    },
    searchWrapper: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'transparent',
    },
    searchInput: {
        backgroundColor: '#eaebec',
        height: 45,
        fontSize: 14,
    },
    list: {
        flex: 1,
    },
    modal: {
        margin: 16,
        borderRadius: 16,
        padding: 16,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    modalPerson: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    modalAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
});

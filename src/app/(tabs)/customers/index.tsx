import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme, TextInput } from "react-native-paper";
import { customers } from "../../../types/mocks/Customer.mock";
import CustomerCardApp from "../../../components/customers/CustomerCardApp";


export default function CustomersScreen() {
    const theme = useTheme();
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return customers;
        return customers.filter(
            (c) =>
                c.name.toLowerCase().includes(term) ||
                (c.email?.toLowerCase().includes(term) ?? false) ||
                (c.phone?.toLowerCase().includes(term) ?? false),
        );
    }, [search]);

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
                        <TextInput
                            mode="flat"
                            placeholder="Buscar clientes..."
                            value={search}
                            onChangeText={setSearch}
                            style={styles.searchInput}
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                            left={<TextInput.Icon icon="magnify" color="#A0A0A0" size={20} />}
                            right={
                                search.length > 0 ? (
                                    <TextInput.Icon
                                        icon="close-circle"
                                        color="#A0A0A0"
                                        size={20}
                                        onPress={() => setSearch("")}
                                    />
                                ) : null
                            }
                            placeholderTextColor="#A0A0A0"
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

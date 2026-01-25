import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import { SearchInputApp } from "@/components/SearchInputApp";
import { useCustomersQuery } from "@/hooks/queries/useCustomersQuery";
import { getCustomerSelectFieldStyles } from "@/components/customers/CustomerSelectField/customerSelectField.styles";

type CustomerSelectFieldProps = {
    visible: boolean;
    label?: string;
    displayValue?: string;
    isFieldLoading?: boolean;
    selectedCustomerId: number | null;
    onClose: () => void;
    onOpen: () => void;
    onSelect: (payload: { id: number; name: string }) => void;
};

export function CustomerSelectField({
    visible,
    displayValue,
    isFieldLoading = false,
    selectedCustomerId,
    onClose,
    onOpen,
    onSelect,
}: CustomerSelectFieldProps) {
    const theme = useTheme();
    const styles = useMemo(() => getCustomerSelectFieldStyles(theme), [theme]);
    const [search, setSearch] = useState("");
    const {
        data: customers = [],
        isLoading,
        isError,
    } = useCustomersQuery();

    useEffect(() => {
        if (visible) {
            setSearch("");
        }
    }, [visible]);

    const filteredCustomers = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return customers;
        return customers.filter((customer) => {
            const hay = [
                customer.name,
                customer.email,
                customer.phone,
                customer.taxId,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            return hay.includes(term);
        });
    }, [customers, search]);

    const selectedCustomerName = useMemo(() => {
        if (!selectedCustomerId) return undefined;
        return customers.find((customer) => customer.id === selectedCustomerId)?.name;
    }, [customers, selectedCustomerId]);

    const displayText = isFieldLoading
        ? "Cargando..."
        : displayValue ?? selectedCustomerName ?? "Seleccionar";

    return (
        <>
            <View>
                <Text style={styles.fieldLabel}>Cliente</Text>
                <Pressable style={styles.selectField} onPress={onOpen}>
                    <Text style={styles.selectText}>{displayText}</Text>
                    <MaterialCommunityIcons
                        name="chevron-down"
                        size={18}
                        color={theme.colors.onSurfaceVariant}
                    />
                </Pressable>
            </View>

            <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
                <Pressable style={styles.overlay} onPress={onClose} />
                <View style={styles.sheet}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Seleccionar cliente</Text>
                        <Pressable style={styles.closeButton} onPress={onClose}>
                            <MaterialCommunityIcons
                                name="close"
                                size={18}
                                color={theme.colors.onSurface}
                            />
                        </Pressable>
                    </View>

                    <SearchInputApp
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Buscar cliente..."
                        style={styles.searchInput}
                    />

                    {isLoading ? (
                        <Text style={styles.emptyText}>Cargando clientes...</Text>
                    ) : isError ? (
                        <Text style={styles.emptyText}>No se pudieron cargar los clientes.</Text>
                    ) : filteredCustomers.length === 0 ? (
                        <Text style={styles.emptyText}>No hay clientes con esa busqueda.</Text>
                    ) : (
                        <FlatList
                            data={filteredCustomers}
                            keyExtractor={(item) => String(item.id)}
                            keyboardShouldPersistTaps="handled"
                            renderItem={({ item }) => {
                                const isSelected = item.id === selectedCustomerId;
                                return (
                                    <Pressable
                                        style={[
                                            styles.row,
                                            isSelected && styles.rowSelected,
                                        ]}
                                        onPress={() => {
                                            onSelect({ id: item.id, name: item.name });
                                            onClose();
                                        }}
                                    >
                                        <View style={styles.rowInfo}>
                                            <Text style={styles.rowName}>{item.name}</Text>
                                            <Text style={styles.rowMeta}>
                                                {item.email || item.phone || "Sin contacto"}
                                            </Text>
                                        </View>
                                        {isSelected ? (
                                            <MaterialCommunityIcons
                                                name="check"
                                                size={18}
                                                color={theme.colors.primary}
                                            />
                                        ) : null}
                                    </Pressable>
                                );
                            }}
                        />
                    )}
                </View>
            </Modal>
        </>
    );
}

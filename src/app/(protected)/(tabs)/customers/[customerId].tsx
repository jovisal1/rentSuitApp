import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Pressable,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import {
    Text,
    Avatar,
    useTheme,
    IconButton,
    Portal,
    Dialog,
    Button,
} from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";

import { Customer } from "@/types/Customer";
import { CustomerContactInfo } from "@/components/customers/CustomerContactInfo";
import { CustomerOrders } from "@/components/customers/CustomerOrders";
import { getCustomerById, deleteCustomer } from "@/services/customerService"; // <-- añade deleteCustomer en tu service
import { getCustomerInfoStyles } from "@/styles/customers.styles";
import { getCompactEmptyStateStyles } from "@/styles/common.styles";

export default function CustomerProfileScreen() {
    const theme = useTheme();
    const emptyStyles = useMemo(() => getCompactEmptyStateStyles(theme), [theme]);
    const styles = useMemo(() => getCustomerInfoStyles(theme), [theme]);
    const { customerId } = useLocalSearchParams<{ customerId?: string }>();

    const [activeTab, setActiveTab] = useState("Datos de contacto");
    const [isEditing, setIsEditing] = useState(false);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [confirmVisible, setConfirmVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadCustomer = async () => {
            const id = Number(customerId);
            if (!Number.isFinite(id)) {
                if (isMounted) {
                    setCustomer(null);
                    setIsLoading(false);
                }
                return;
            }

            const data = await getCustomerById(id);
            if (isMounted) {
                setCustomer(data ?? null);
                setIsLoading(false);
            }
        };

        loadCustomer();

        return () => {
            isMounted = false;
        };
    }, [customerId]);

    const handleDeleteCustomer = async () => {
        if (!customer) return;

        try {
            setIsDeleting(true);
            setConfirmVisible(false);

            await deleteCustomer(customer.id);

            // Volver al listado
            router.back();
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <View style={[emptyStyles.emptyContainer, { backgroundColor: theme.colors.background }]}>
                <Text style={emptyStyles.emptyText}>Cargando cliente...</Text>
            </View>
        );
    }

    if (!customer) {
        return (
            <View style={[emptyStyles.emptyContainer, { backgroundColor: theme.colors.background }]}>
                <Text style={emptyStyles.emptyText}>Cliente no encontrado.</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.fixedHeader}>
                <View style={styles.headerSection}>
                    <View style={styles.headerLeft}>
                        <View style={styles.avatarContainer}>
                            <Avatar.Text
                                size={64}
                                label={customer.name.substring(0, 2).toUpperCase()}
                                style={{ backgroundColor: theme.colors.surfaceVariant }}
                                labelStyle={{ color: theme.colors.primary, fontWeight: "700" }}
                            />
                            <View
                                style={[
                                    styles.statusIndicator,
                                    {
                                        backgroundColor: customer.active
                                            ? theme.colors.primary
                                            : theme.colors.outlineVariant,
                                    },
                                ]}
                            />
                        </View>

                        <View style={styles.infoTextContainer}>
                            <Text style={styles.userNameText}>{customer.name}</Text>
                            <Text style={styles.userSubText}>
                                ID: {customer.id} • {customer.active ? "Activo" : "Inactivo"}
                            </Text>
                        </View>
                    </View>

                    <IconButton
                        icon="delete-outline"
                        size={22}
                        iconColor={theme.colors.error}
                        onPress={() => setConfirmVisible(true)}
                        accessibilityLabel="Eliminar cliente"
                        disabled={isEditing || isDeleting}
                    />
                </View>

                <View style={styles.segmentedControlWrapper}>
                    <View style={styles.segmentedControlBackground}>
                        {["Datos de contacto", "Pedidos"].map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <Pressable
                                    key={tab}
                                    onPress={() => {
                                        setActiveTab(tab);
                                        setIsEditing(false);
                                    }}
                                    style={[styles.segmentItem, isActive && styles.segmentItemActive]}
                                >
                                    <Text
                                        style={[
                                            styles.segmentText,
                                            isActive && { color: theme.colors.primary, fontWeight: "700" },
                                        ]}
                                    >
                                        {tab}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            </View>

            <ScrollView
                style={[styles.scrollArea, { backgroundColor: theme.colors.background }]}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
            >
                {activeTab === "Datos de contacto" ? (
                    <CustomerContactInfo
                        customer={customer}
                        isEditing={isEditing}
                        setCustomer={setCustomer}
                        setIsEditing={setIsEditing}
                    />
                ) : (
                    <CustomerOrders />
                )}
            </ScrollView>

            <Portal>
                <Dialog visible={confirmVisible} onDismiss={() => setConfirmVisible(false)}>
                    <Dialog.Title>Eliminar cliente</Dialog.Title>

                    <Dialog.Content>
                        <Text>
                            ¿Seguro que deseas eliminar a{" "}
                            <Text style={{ fontWeight: "700" }}>{customer.name}</Text>? Esta acción no se
                            puede deshacer.
                        </Text>
                    </Dialog.Content>

                    <Dialog.Actions>
                        <Button onPress={() => setConfirmVisible(false)} disabled={isDeleting}>
                            Cancelar
                        </Button>
                        <Button textColor={theme.colors.error} onPress={handleDeleteCustomer} loading={isDeleting}>
                            Eliminar
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </KeyboardAvoidingView>
    );
}
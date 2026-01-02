import React, { useEffect, useState } from "react";
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

import { Customer } from "../../../types/Customer";
import { CustomerContactInfo } from "../../../components/customers/CustomerContactInfo";
import { CustomerOrders } from "../../../components/customers/CustomerOrders";
import { getCustomerById, deleteCustomer } from "../../../services/customerService"; // <-- añade deleteCustomer en tu service
import { themeApp } from "../../../theme";
import { compactEmptyStateStyles } from "../../../styles/common.styles";
import { customerInfoStyle } from "../../../styles/customers.styles";

export default function CustomerProfileScreen() {
    const theme = useTheme();
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
            <View style={[compactEmptyStateStyles.emptyContainer, { backgroundColor: theme.colors.background }]}>
                <Text style={compactEmptyStateStyles.emptyText}>Cargando cliente...</Text>
            </View>
        );
    }

    if (!customer) {
        return (
            <View style={[compactEmptyStateStyles.emptyContainer, { backgroundColor: theme.colors.background }]}>
                <Text style={compactEmptyStateStyles.emptyText}>Cliente no encontrado.</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={customerInfoStyle.container}
        >
            <View style={customerInfoStyle.fixedHeader}>
                <View style={customerInfoStyle.headerSection}>
                    <View style={customerInfoStyle.headerLeft}>
                        <View style={customerInfoStyle.avatarContainer}>
                            <Avatar.Text
                                size={64}
                                label={customer.name.substring(0, 2).toUpperCase()}
                                style={{ backgroundColor: "#F0F4F8" }}
                                labelStyle={{ color: themeApp.colors.primary, fontWeight: "700" }}
                            />
                            <View
                                style={[
                                    customerInfoStyle.statusIndicator,
                                    { backgroundColor: customer.active ? "#4CAF50" : "#CCC" },
                                ]}
                            />
                        </View>

                        <View style={customerInfoStyle.infoTextContainer}>
                            <Text style={customerInfoStyle.userNameText}>{customer.name}</Text>
                            <Text style={customerInfoStyle.userSubText}>
                                ID: {customer.id} • {customer.active ? "Activo" : "Inactivo"}
                            </Text>
                        </View>
                    </View>

                    <IconButton
                        icon="delete-outline"
                        size={22}
                        iconColor="#D32F2F"
                        onPress={() => setConfirmVisible(true)}
                        accessibilityLabel="Eliminar cliente"
                        disabled={isEditing || isDeleting}
                    />
                </View>

                <View style={customerInfoStyle.segmentedControlWrapper}>
                    <View style={customerInfoStyle.segmentedControlBackground}>
                        {["Datos de contacto", "Pedidos"].map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <Pressable
                                    key={tab}
                                    onPress={() => {
                                        setActiveTab(tab);
                                        setIsEditing(false);
                                    }}
                                    style={[customerInfoStyle.segmentItem, isActive && customerInfoStyle.segmentItemActive]}
                                >
                                    <Text
                                        style={[
                                            customerInfoStyle.segmentText,
                                            isActive && { color: themeApp.colors.primary, fontWeight: "700" },
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
                style={[customerInfoStyle.scrollArea, { backgroundColor: theme.colors.background }]}
                contentContainerStyle={customerInfoStyle.scrollContent}
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
                        <Button textColor="#D32F2F" onPress={handleDeleteCustomer} loading={isDeleting}>
                            Eliminar
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </KeyboardAvoidingView>
    );
}


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
            <View style={[styles.emptyContainer, { backgroundColor: theme.colors.background }]}>
                <Text style={styles.emptyText}>Cargando cliente...</Text>
            </View>
        );
    }

    if (!customer) {
        return (
            <View style={[styles.emptyContainer, { backgroundColor: theme.colors.background }]}>
                <Text style={styles.emptyText}>Cliente no encontrado.</Text>
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
                                style={{ backgroundColor: "#F0F4F8" }}
                                labelStyle={{ color: themeApp.colors.primary, fontWeight: "700" }}
                            />
                            <View
                                style={[
                                    styles.statusIndicator,
                                    { backgroundColor: customer.active ? "#4CAF50" : "#CCC" },
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
                        iconColor="#D32F2F"
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
                        <Button textColor="#D32F2F" onPress={handleDeleteCustomer} loading={isDeleting}>
                            Eliminar
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FBFBFC" },
    fixedHeader: {
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
        zIndex: 10,
    },

    headerSection: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 15,
        marginBottom: 15,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    avatarContainer: { position: "relative" },
    statusIndicator: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: "#FFF",
    },
    infoTextContainer: { marginLeft: 15 },
    userNameText: { fontSize: 17, fontWeight: "700", color: "#1A1A1A" },
    userSubText: { fontSize: 12, color: "#999" },

    segmentedControlWrapper: { paddingHorizontal: 16, marginBottom: 10 },
    segmentedControlBackground: {
        flexDirection: "row",
        backgroundColor: "#F0F1F5",
        borderRadius: 8,
        padding: 2,
    },
    segmentItem: { flex: 1, paddingVertical: 7, alignItems: "center", borderRadius: 6 },
    segmentItemActive: { backgroundColor: "#FFF", elevation: 1 },
    segmentText: { fontSize: 12, color: "#888" },

    scrollArea: { flex: 1 },
    scrollContent: { padding: 12, paddingBottom: 100, flexGrow: 1 },

    emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 50 },
    emptyText: { color: "#BBB", fontSize: 13, marginTop: 8 },
});

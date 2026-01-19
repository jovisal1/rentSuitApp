import React, { useMemo } from "react";
import {
    View,
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
} from "react-native-paper";

import { CustomerContactInfo } from "@/components/customers/CustomerContactInfo";
import { CustomerOrders } from "@/components/customers/CustomerOrders";
import { CommonDialogApp } from "@/components/CommonDialogApp";
import { getCustomerInfoStyles } from "@/styles/customers.styles";
import { getCompactEmptyStateStyles } from "@/styles/common.styles";
import { useCustomerProfile } from "@/hooks/useCustomerProfile";

export default function CustomerProfileScreen() {
    const theme = useTheme();
    const emptyStyles = useMemo(() => getCompactEmptyStateStyles(theme), [theme]);
    const styles = useMemo(() => getCustomerInfoStyles(theme), [theme]);
    const {
        activeTab,
        setActiveTab,
        isEditing,
        setIsEditing,
        customer,
        setCustomer,
        isLoading,
        confirmVisible,
        setConfirmVisible,
        isDeleting,
        isCreating,
        handleDeleteCustomer,
        handleCreateCustomer,
        handleCancelCreate,
    } = useCustomerProfile();

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
                                label={(customer.name || "NC").substring(0, 2).toUpperCase()}
                                style={{ backgroundColor: theme.colors.surfaceVariant }}
                                labelStyle={{ color: theme.colors.primary, fontWeight: "700" }}
                            />
                            {!isCreating && (
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
                            )}
                        </View>

                        <View style={styles.infoTextContainer}>
                            <Text style={styles.userNameText}>
                                {isCreating ? "Nuevo cliente" : customer.name}
                            </Text>
                            <Text style={styles.userSubText}>
                                {isCreating
                                    ? "Completa los datos principales"
                                    : `ID: ${customer.id} • ${customer.active ? "Activo" : "Inactivo"}`}
                            </Text>
                        </View>
                    </View>

                    {!isCreating && (
                        <IconButton
                            icon="delete-outline"
                            size={22}
                            iconColor={theme.colors.error}
                            onPress={() => setConfirmVisible(true)}
                            accessibilityLabel="Eliminar cliente"
                            disabled={isEditing || isDeleting}
                        />
                    )}
                </View>

                {!isCreating && (
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
                )}
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
                        onSave={isCreating ? handleCreateCustomer : undefined}
                        onCancel={isCreating ? handleCancelCreate : undefined}
                        successMessage={isCreating ? "Cliente creado." : undefined}
                        errorMessage={isCreating ? "No se pudo crear el cliente." : undefined}
                    />
                ) : !isCreating ? (
                    <CustomerOrders customerId={customer.id} customerName={customer.name} />
                ) : null}
            </ScrollView>

            {!isCreating && (
                <CommonDialogApp
                    visible={confirmVisible}
                    title="Eliminar cliente"
                    message={
                        <Text>
                            ¿Seguro que deseas eliminar a{" "}
                            <Text style={{ fontWeight: "700" }}>{customer.name}</Text>? Esta acción no se puede
                            deshacer.
                        </Text>
                    }
                    cancelText="Cancelar"
                    confirmText="Eliminar"
                    onCancel={() => setConfirmVisible(false)}
                    onConfirm={handleDeleteCustomer}
                    cancelDisabled={isDeleting}
                    confirmLoading={isDeleting}
                />
            )}
        </KeyboardAvoidingView>
    );
}

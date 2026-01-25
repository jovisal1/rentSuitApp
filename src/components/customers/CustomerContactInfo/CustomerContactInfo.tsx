import React, { useMemo } from "react";
import { View, Platform } from "react-native";
import { Text, Portal } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import { EditableFieldApp } from "@/components/EditableFieldApp";
import { TextInputApp } from "@/components/TextInputApp";
import { FloatingFabApp } from "@/components/FloatingFabApp";
import { themeApp } from "@/theme";
import { Customer } from "@/types/Customer";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getCustomerContactInfoStyles } from "@/components/customers/CustomerContactInfo/customerContactInfo.styles";
import { useCustomerContactInfo } from "@/hooks/useCustomerContactInfo";



interface CustomerContactInfoProps {
    customer: Customer;
    isEditing: boolean;
    setCustomer: (customer: Customer) => void;
    setIsEditing: (value: boolean) => void;
    onSave?: (customer: Customer) => Promise<Customer | undefined>;
    onCancel?: () => void;
    successMessage?: string;
    errorMessage?: string;
}


export function CustomerContactInfo({
    customer,
    isEditing,
    setCustomer,
    setIsEditing,
    onSave,
    onCancel,
    successMessage,
    errorMessage,
}: CustomerContactInfoProps) {
    const styles = useMemo(() => getCustomerContactInfoStyles(), []);
    const isFocused = useIsFocused();
    const { errors, isSaving, hasErrors, clearError, handleEdit, handleCancel, handleSave } =
        useCustomerContactInfo({
            customer,
            setCustomer,
            setIsEditing,
            onSave,
            onCancel,
            successMessage,
            errorMessage,
        });


    return (
        <View style={styles.container}>
            <EditableFieldApp
                icon="account-outline"
                label="Nombre"
                value={customer.name}
                isEditing={isEditing}
                errorText={isEditing ? errors["name"] : undefined}
                onChangeText={(t: string) => {
                    clearError("name");
                    setCustomer({ ...customer, name: t });
                }}
            />


            <EditableFieldApp
                icon="card-account-details-outline"
                label="NIF / CIF"
                value={customer.taxId || ""}
                isEditing={isEditing}
                errorText={isEditing ? errors["taxId"] : undefined}
                onChangeText={(t: string) => {
                    clearError("taxId");
                    setCustomer({ ...customer, taxId: t });
                }}
            />


            <EditableFieldApp
                icon="email-outline"
                label="Email"
                value={customer.email || ""}
                isEditing={isEditing}
                errorText={isEditing ? errors["email"] : undefined}
                onChangeText={(t: string) => {
                    clearError("email");
                    setCustomer({ ...customer, email: t });
                }}
            />


            <EditableFieldApp
                icon="phone-outline"
                label="Teléfono"
                value={customer.phone || ""}
                isEditing={isEditing}
                errorText={isEditing ? errors["phone"] : undefined}
                onChangeText={(t: string) => {
                    clearError("phone");
                    setCustomer({ ...customer, phone: t });
                }}
            />

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Dirección principal</Text>
            </View>

            <EditableFieldApp
                icon="map-marker-outline"
                label="Calle y número"
                value={customer.address.line1}
                isEditing={isEditing}
                errorText={isEditing ? errors["address.line1"] : undefined}
                onChangeText={(t: string) => {
                    clearError("address.line1");
                    setCustomer({ ...customer, address: { ...customer.address, line1: t } });
                }}
            />


            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1.5 }}>
                    <EditableFieldApp
                        icon="city-variant-outline"
                        label="Ciudad"
                        value={customer.address.city || ""}
                        isEditing={isEditing}
                        errorText={isEditing ? errors["address.city"] : undefined}
                        onChangeText={(t: string) => {
                            clearError("address.city");
                            setCustomer({
                                ...customer,
                                address: { ...customer.address, city: t },
                            });
                        }}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <EditableFieldApp
                        icon="mailbox-outline"
                        label="C.P."
                        value={customer.address.postalCode || ""}
                        isEditing={isEditing}
                        errorText={isEditing ? errors["address.postalCode"] : undefined}
                        onChangeText={(t: string) => {
                            clearError("address.postalCode");
                            setCustomer({
                                ...customer,
                                address: { ...customer.address, postalCode: t },
                            });
                        }}
                    />
                </View>
            </View>

            <View style={styles.notesContainer}>
                <View style={styles.notesHeader}>
                    <MaterialCommunityIcons
                        name="note-text-outline"
                        size={16}
                        color={themeApp.colors.primary}
                    />
                    <Text style={styles.labelTitleNotes}>Notas de cliente</Text>
                </View>

                {isEditing ? (
                    <TextInputApp
                        value={customer.notes}
                        onChangeText={(t: string) => {
                            clearError("notes");
                            setCustomer({ ...customer, notes: t });
                        }}
                        errorText={isEditing ? errors["notes"] : undefined}
                        mode="outlined"
                        multiline
                        numberOfLines={4}
                        style={styles.textArea}
                    />
                ) : (
                    <Text style={styles.valueTextNotes}>
                        {customer.notes || "Sin notas adicionales"}
                    </Text>
                )}
            </View>

            {isFocused && (
                <Portal>
                    {isEditing && (
                        <FloatingFabApp
                            icon="close"
                            onPress={handleCancel}
                            size="small"
                            disabled={isSaving}
                            style={{ elevation: 0, marginBottom: 10 }}
                        />
                    )}

                    <FloatingFabApp
                        icon={isEditing ? "check" : "pencil"}
                        onPress={isEditing ? handleSave : handleEdit}
                        size="medium"
                        disabled={isSaving}
                        loading={isSaving}
                    />
                </Portal>
            )}

            {isEditing && hasErrors ? <View style={{ height: 0 }} /> : null}
        </View>
    );
}

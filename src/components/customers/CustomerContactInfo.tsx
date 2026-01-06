import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, FAB, Portal } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import { EditableFieldApp } from "@/components/EditableFieldApp";
import { TextInputApp } from "@/components/TextInputApp";
import { themeApp } from "@/theme";
import { Customer } from "@/types/Customer";
import { customerSchema } from "@/schemas/customer.schema";
import { useAppSnackbar } from "@/providers/SnackBarProvider";
import { FieldErrors, zodIssuesToFieldErrors } from "@/schemas/utils";
import { updateCustomer } from "@/services/customerService";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";



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
    const [tempCustomer, setTempCustomer] = useState<Customer>({ ...customer });
    const [errors, setErrors] = useState<FieldErrors>({});
    const [isSaving, setIsSaving] = useState(false);
    const isFocused = useIsFocused();
    const { show } = useAppSnackbar();
    const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);
    const tabBarHeight = useBottomTabBarHeight();
    const { bottom } = useSafeAreaInsets();

    const fabBottom = tabBarHeight + bottom;
    const smallFabOffset = 56;

    const clearError = (path: string) => {
        setErrors((prev) => {
            if (!prev[path]) return prev;
            const next = { ...prev };
            delete next[path];
            return next;
        });
    };

    const handleEdit = () => {
        setTempCustomer(JSON.parse(JSON.stringify(customer)));
        setErrors({});
        setIsEditing(true);
    };

    const handleCancel = () => {
        if (isSaving) return;
        if (onCancel) {
            onCancel();
            return;
        }
        setCustomer(tempCustomer);
        setErrors({});
        setIsEditing(false);
    };

    const handleSave = async () => {
        if (isSaving) return;
        const result = customerSchema.safeParse(customer);
        if (!result.success) {
            setErrors(zodIssuesToFieldErrors(result.error.issues));
            show({ message: "Revisa los campos marcados." });
            return;
        }
        try {
            setIsSaving(true);
            const savedCustomer = onSave
                ? await onSave(customer)
                : await updateCustomer(customer);
            if (!savedCustomer) {
                show({ message: errorMessage ?? "No se pudo guardar el cliente." });
                return;
            }
            setCustomer(savedCustomer);
            setErrors({});
            setIsEditing(false);
            show({ message: successMessage ?? "Cambios guardados.", duration: 2000 });
        } finally {
            setIsSaving(false);
        }
    };

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
                        <FAB
                            icon="close"
                            style={[styles.fabSmall, { bottom: fabBottom + smallFabOffset }]}
                            color={themeApp.colors.primary}
                            onPress={handleCancel}
                            size="small"
                            disabled={isSaving}
                        />
                    )}

                    <FAB
                        icon={isEditing ? "check" : "pencil"}
                        style={[
                            styles.fabMain,
                            { bottom: fabBottom, backgroundColor: themeApp.colors.primary },
                        ]}
                        color="white"
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        paddingBottom: 10,
    },
    sectionHeader: { marginTop: 12, marginBottom: 4, paddingLeft: 2 },
    sectionTitle: {
        fontSize: 10,
        fontWeight: "800",
        color: "#06305f",
        textTransform: "uppercase",
        opacity: 0.5,
    },
    notesContainer: { marginTop: 12 },
    notesHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
    labelTitleNotes: {
        fontSize: 10,
        color: "#A0A0A0",
        textTransform: "uppercase",
        letterSpacing: 0.3,
        marginLeft: 8,
    },
    valueTextNotes: { fontSize: 14, color: "#555", lineHeight: 20, paddingLeft: 4 },
    textArea: {
        height: 100,
        backgroundColor: "#FFF",
        fontSize: 14,
        textAlignVertical: "top",
        marginTop: 4,
    },
    fabMain: {
        position: "absolute",
        right: 20,
        alignItems: "center",
        borderRadius: 30,
        elevation: 3,
    },
    fabSmall: {
        position: "absolute",
        right: 30,
        alignItems: "center",
        backgroundColor: "#F0F1F5",
        marginBottom: 10,
        borderRadius: 30,
        elevation: 0,
    },
});

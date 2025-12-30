import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { Text, Avatar, useTheme } from "react-native-paper";
import { Customer } from "../../../types/Customer";
import { CustomerContactInfo } from "../../../components/customers/CustomerContactInfo";
import { CustomerOrders } from "../../../components/customers/CustomerOrders";

export default function CustomerProfileScreen() {
    const theme = useTheme();
    const PRIMARY_COLOR = '#06305f';
    const [activeTab, setActiveTab] = useState('Datos de contacto');
    const [isEditing, setIsEditing] = useState(false);

    const [customer, setCustomer] = useState<Customer>({
        id: 1,
        name: "David Thompson",
        taxId: "45321678L",
        phone: "+34 600 123 456",
        email: "davidthompson@gmail.com",
        notes: "Cliente preferente de temporada alta. Requiere atención especial en las entregas de fin de semana.",
        active: true,
        address: {
            id: 101,
            line1: "Calle Mayor 15, 2ºB",
            city: "Madrid",
            postalCode: "28001",
            isPrimary: true
        }
    });



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {/* --- CABECERA FIJA --- */}
            <View style={styles.fixedHeader}>
                <View style={styles.headerSection}>
                    <View style={styles.avatarContainer}>
                        <Avatar.Text
                            size={64}
                            label={customer.name.substring(0, 2).toUpperCase()}
                            style={{ backgroundColor: '#F0F4F8' }}
                            labelStyle={{ color: PRIMARY_COLOR, fontWeight: '700' }}
                        />
                        <View style={[styles.statusIndicator, { backgroundColor: customer.active ? '#4CAF50' : '#CCC' }]} />
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.userNameText}>{customer.name}</Text>
                        <Text style={styles.userSubText}>ID: {customer.id} • {customer.active ? "Activo" : "Inactivo"}</Text>
                    </View>
                </View>

                <View style={styles.segmentedControlWrapper}>
                    <View style={styles.segmentedControlBackground}>
                        {['Datos de contacto', 'Pedidos'].map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <Pressable
                                    key={tab}
                                    onPress={() => { setActiveTab(tab); setIsEditing(false); }}
                                    style={[styles.segmentItem, isActive && styles.segmentItemActive]}
                                >
                                    <Text style={[styles.segmentText, isActive && { color: PRIMARY_COLOR, fontWeight: '700' }]}>
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
                {activeTab === 'Datos de contacto' ? (
                    <CustomerContactInfo customer={customer} isEditing={isEditing} setCustomer={setCustomer} setIsEditing={setIsEditing} />
                ) : (
                    <CustomerOrders />
                )}
            </ScrollView>

        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FBFBFC' },
    fixedHeader: { backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#F0F0F0', zIndex: 10 },
    headerSection: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 15, marginBottom: 15 },
    avatarContainer: { position: 'relative' },
    statusIndicator: {
        position: 'absolute', bottom: 0, right: 0,
        width: 14, height: 14, borderRadius: 7,
        borderWidth: 2, borderColor: '#FFF'
    },
    infoTextContainer: { marginLeft: 15 },
    userNameText: { fontSize: 17, fontWeight: '700', color: '#1A1A1A' },
    userSubText: { fontSize: 12, color: '#999' },
    segmentedControlWrapper: { paddingHorizontal: 16, marginBottom: 10 },
    segmentedControlBackground: { flexDirection: 'row', backgroundColor: '#F0F1F5', borderRadius: 8, padding: 2 },
    segmentItem: { flex: 1, paddingVertical: 7, alignItems: 'center', borderRadius: 6 },
    segmentItemActive: { backgroundColor: '#FFF', elevation: 1 },
    segmentText: { fontSize: 12, color: '#888' },

    scrollArea: { flex: 1 },
    scrollContent: { padding: 12, paddingBottom: 100, flexGrow: 1 },
    emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 },
    emptyText: { color: '#BBB', fontSize: 13, marginTop: 8 },

});
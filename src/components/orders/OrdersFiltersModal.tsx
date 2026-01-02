import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { DateInputFieldApp } from "../DateInputFieldApp";
import { themeApp } from "../../theme";
import type { OrderStatus } from "../../types/Order"; // ajusta la ruta si hace falta

type StatusFilter = OrderStatus | "ALL";

interface OrdersFiltersModalProps {
    visible: boolean;
    onClose: () => void;

    startDateFrom: Date | null;
    endDateTo: Date | null;

    status: StatusFilter;
    statusOptions: Array<{ label: string; value: StatusFilter }>;

    onChangeStartDate: (date: Date | null) => void;
    onChangeEndDate: (date: Date | null) => void;
    onChangeStatus: (status: StatusFilter) => void;

    onClear: () => void;
    onApply: () => void;
}

export default function OrdersFiltersModal({
    visible,
    onClose,
    startDateFrom,
    endDateTo,
    status,
    statusOptions,
    onChangeStartDate,
    onChangeEndDate,
    onChangeStatus,
    onClear,
    onApply,
}: OrdersFiltersModalProps) {
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            {/* Overlay: cerrar tocando fuera */}
            <Pressable style={styles.overlay} onPress={onClose} />

            <View style={styles.sheet}>
                <View style={styles.sheetHeader}>
                    <Text style={styles.sheetTitle}>Filtros</Text>
                </View>

                <View style={styles.sheetContent}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Fecha inicio (desde)</Text>
                        <DateInputFieldApp
                            labelWhenEmpty="Selecciona fecha"
                            value={startDateFrom}
                            onChange={onChangeStartDate}
                        />
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Fecha fin (hasta)</Text>
                        <DateInputFieldApp
                            labelWhenEmpty="Selecciona fecha"
                            value={endDateTo}
                            onChange={onChangeEndDate}
                        />
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Estado</Text>
                        <View style={styles.statusPills}>
                            {statusOptions.map((opt) => {
                                const selected = status === opt.value;

                                return (
                                    <Pressable
                                        key={opt.value}
                                        onPress={() => onChangeStatus(opt.value)}
                                        style={[
                                            styles.pill,
                                            selected && { borderColor: themeApp.colors.primary },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.pillText,
                                                selected && {
                                                    color: themeApp.colors.primary,
                                                    fontWeight: "700",
                                                },
                                            ]}
                                        >
                                            {opt.label}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                </View>

                <View style={styles.sheetActions}>
                    <Pressable style={styles.secondaryBtn} onPress={onClear}>
                        <Text style={styles.secondaryBtnText}>Limpiar</Text>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.primaryBtn,
                            {
                                backgroundColor: themeApp.colors.primary,
                                borderColor: themeApp.colors.primary,
                            },
                        ]}
                        onPress={onApply}
                    >
                        <Text style={styles.primaryBtnText}>Aceptar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
    },

    sheet: {
        backgroundColor: "#FFF",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        paddingBottom: 12,
        borderTopWidth: 1,
        borderColor: "#EEE",
    },

    sheetHeader: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    sheetTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: themeApp.colors.primary,
    },
    closeIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },

    sheetContent: {
        paddingHorizontal: 16,
        gap: 12,
        paddingBottom: 10,
    },

    row: { gap: 8 },
    label: {
        color: "#333",
        fontWeight: "700",
    },

    statusPills: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    pill: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 999,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    pillText: { color: "#333", fontWeight: "600" },

    sheetActions: {
        paddingHorizontal: 16,
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
    },

    secondaryBtn: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: "#FFF",
    },
    secondaryBtnText: { color: "#333", fontWeight: "700" },

    primaryBtn: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
    },
    primaryBtnText: {
        color: (themeApp as any)?.colors?.onPrimary ?? "#FFF",
        fontWeight: "800",
    },
});

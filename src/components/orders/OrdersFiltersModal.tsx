import React, { useMemo } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

import { DateInputFieldApp } from "../DateInputFieldApp";
import type { OrderStatus } from "../../types/Order"; // ajusta la ruta si hace falta
import { getOrderFiltersModalStyles } from "../../styles/orders.styles";

type StatusFilter = OrderStatus | "ALL";

const STATUS_OPTIONS: Array<{ label: string; value: StatusFilter }> = [
    { label: "Todos", value: "ALL" },
    { label: "Preparado", value: "PREPARADO" },
    { label: "Entregado", value: "ENTREGADO" },
    { label: "Devuelto", value: "DEVUELTO" },
    { label: "Pendiente revisión", value: "PENDIENTE_REVISION" },
    { label: "Finalizado", value: "FINALIZADO" },
];

interface OrdersFiltersModalProps {
    visible: boolean;
    onClose: () => void;

    startDateFrom: Date | null;
    endDateTo: Date | null;

    status: StatusFilter;

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
    onChangeStartDate,
    onChangeEndDate,
    onChangeStatus,
    onClear,
    onApply,
}: OrdersFiltersModalProps) {
    const theme = useTheme();
    const styles = useMemo(() => getOrderFiltersModalStyles(theme), [theme]);

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            {/* Overlay: cerrar tocando fuera */}
            <Pressable style={styles.overlay} onPress={onClose} />

            <View style={styles.sheet}>
                <View style={styles.sheetHeader}>
                    <Text style={[styles.sheetTitle, { color: theme.colors.primary }]}>
                        Filtros
                    </Text>
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
                            {STATUS_OPTIONS.map((opt) => {
                                const selected = status === opt.value;

                                return (
                                    <Pressable
                                        key={opt.value}
                                        onPress={() => onChangeStatus(opt.value)}
                                        style={[
                                            styles.pill,
                                            selected && { borderColor: theme.colors.primary },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.pillText,
                                                selected && {
                                                    color: theme.colors.primary,
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
                                backgroundColor: theme.colors.primary,
                                borderColor: theme.colors.primary,
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
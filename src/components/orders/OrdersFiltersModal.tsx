import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

import { DateInputFieldApp } from "../DateInputFieldApp";
import { themeApp } from "../../theme";
import type { OrderStatus } from "../../types/Order"; // ajusta la ruta si hace falta
import { orderFiltersModalStyles } from "../../styles/orders.styles";

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
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            {/* Overlay: cerrar tocando fuera */}
            <Pressable style={orderFiltersModalStyles.overlay} onPress={onClose} />

            <View style={orderFiltersModalStyles.sheet}>
                <View style={orderFiltersModalStyles.sheetHeader}>
                    <Text style={orderFiltersModalStyles.sheetTitle}>Filtros</Text>
                </View>

                <View style={orderFiltersModalStyles.sheetContent}>
                    <View style={orderFiltersModalStyles.row}>
                        <Text style={orderFiltersModalStyles.label}>Fecha inicio (desde)</Text>
                        <DateInputFieldApp
                            labelWhenEmpty="Selecciona fecha"
                            value={startDateFrom}
                            onChange={onChangeStartDate}
                        />
                    </View>

                    <View style={orderFiltersModalStyles.row}>
                        <Text style={orderFiltersModalStyles.label}>Fecha fin (hasta)</Text>
                        <DateInputFieldApp
                            labelWhenEmpty="Selecciona fecha"
                            value={endDateTo}
                            onChange={onChangeEndDate}
                        />
                    </View>

                    <View style={orderFiltersModalStyles.row}>
                        <Text style={orderFiltersModalStyles.label}>Estado</Text>
                        <View style={orderFiltersModalStyles.statusPills}>
                            {STATUS_OPTIONS.map((opt) => {
                                const selected = status === opt.value;

                                return (
                                    <Pressable
                                        key={opt.value}
                                        onPress={() => onChangeStatus(opt.value)}
                                        style={[
                                            orderFiltersModalStyles.pill,
                                            selected && { borderColor: themeApp.colors.primary },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                orderFiltersModalStyles.pillText,
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

                <View style={orderFiltersModalStyles.sheetActions}>
                    <Pressable style={orderFiltersModalStyles.secondaryBtn} onPress={onClear}>
                        <Text style={orderFiltersModalStyles.secondaryBtnText}>Limpiar</Text>
                    </Pressable>

                    <Pressable
                        style={[
                            orderFiltersModalStyles.primaryBtn,
                            {
                                backgroundColor: themeApp.colors.primary,
                                borderColor: themeApp.colors.primary,
                            },
                        ]}
                        onPress={onApply}
                    >
                        <Text style={orderFiltersModalStyles.primaryBtnText}>Aceptar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}


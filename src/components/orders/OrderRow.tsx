import { Pressable, StyleSheet, View, Text } from "react-native";
import { Order } from "../../types/Order";
import { formatDateForDisplay } from "../../services/utils";
import { orderRowStyles } from "../../styles/orders.styles";

export default function OrderRow({ order }: { order: Order }) {
    const statusMap: Record<Order["status"], { color: string; label: string }> = {
        PREPARADO: { color: "#2196F3", label: "Preparado" },
        ENTREGADO: { color: "#4CAF50", label: "Entregado" },
        DEVUELTO: { color: "#9C27B0", label: "Devuelto" },
        PENDIENTE_REVISION: { color: "#FF9800", label: "Pendiente revision" },
        FINALIZADO: { color: "#607D8B", label: "Finalizado" },
    };
    const statusMeta = statusMap[order.status];
    const statusColor = statusMeta?.color ?? "#FF9800";
    const statusLabel = statusMeta?.label ?? order.status;

    return (
        <Pressable
            style={orderRowStyles.row}
        >
            <View style={orderRowStyles.rowHeader}>
                <View style={orderRowStyles.codeContainer}>
                    <Text style={orderRowStyles.codeLabel}>PEDIDO</Text>
                    <Text style={orderRowStyles.codeValue}>#{order.code}</Text>
                </View>
                <View style={[orderRowStyles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
                    <Text style={[orderRowStyles.statusText, { color: statusColor }]}>
                        {statusLabel.toUpperCase()}
                    </Text>
                </View>
            </View>

            <View style={orderRowStyles.divider} />

            <View style={orderRowStyles.footer}>
                <View style={orderRowStyles.dateGroup}>
                    <Text style={orderRowStyles.dateLabel}>Inicio</Text>
                    <Text style={orderRowStyles.dateText}>{formatDateForDisplay(order.startDate)}</Text>
                </View>

                <Text style={orderRowStyles.arrow}>→</Text>

                <View style={[orderRowStyles.dateGroup, { alignItems: 'flex-end' }]}>
                    <Text style={orderRowStyles.dateLabel}>Entrega</Text>
                    <Text style={orderRowStyles.dateText}>{formatDateForDisplay(order.endDate)}</Text>
                </View>
            </View>
        </Pressable>
    );
}

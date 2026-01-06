import { useMemo } from "react";
import { Pressable, View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { Order } from "@/types/Order";
import { formatDateForDisplay } from "@/services/utils";
import { getOrderRowStyles } from "@/styles/orders.styles";

export default function OrderRow({ order }: { order: Order }) {
    const theme = useTheme();
    const styles = useMemo(() => getOrderRowStyles(theme), [theme]);
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
        <Pressable style={styles.row}>
            <View style={styles.rowHeader}>
                <View style={styles.codeContainer}>
                    <Text style={styles.codeLabel}>PEDIDO</Text>
                    <Text style={styles.codeValue}>#{order.code}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
                    <Text style={[styles.statusText, { color: statusColor }]}>
                        {statusLabel.toUpperCase()}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.footer}>
                <View style={styles.dateGroup}>
                    <Text style={styles.dateLabel}>Inicio</Text>
                    <Text style={styles.dateText}>{formatDateForDisplay(order.startDate)}</Text>
                </View>

                <Text style={styles.arrow}>→</Text>

                <View style={[styles.dateGroup, { alignItems: "flex-end" }]}>
                    <Text style={styles.dateLabel}>Entrega</Text>
                    <Text style={styles.dateText}>{formatDateForDisplay(order.endDate)}</Text>
                </View>
            </View>
        </Pressable>
    );
}
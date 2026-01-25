import { useMemo } from "react";
import { Pressable, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { Order } from "@/types/Order";
import { formatDateForDisplay } from "@/utils/dateUtils";
import { ORDER_STATUS_META } from "@/utils/constants";
import { getOrderRowStyles } from "@/styles/orders.styles";

type OrderRowProps = {
    order: Order;
    customerName?: string;
    totalUnits?: number;
    totalProducts?: number;
    totalAmount?: number;
};

const formatAmount = (value: number) => value.toFixed(2);

export default function OrderRow({
    order,
    customerName,
    totalUnits,
    totalProducts,
    totalAmount,
}: OrderRowProps) {
    const theme = useTheme();
    const styles = useMemo(() => getOrderRowStyles(theme), [theme]);
    const statusMeta = ORDER_STATUS_META[order.status];
    const statusColor = statusMeta?.color ?? "#FF9800";
    const statusLabel = statusMeta?.label ?? order.status;
    const unitsText = typeof totalUnits === "number" ? String(totalUnits) : "—";
    const productsText = typeof totalProducts === "number" ? String(totalProducts) : "—";
    const amountText = typeof totalAmount === "number" ? `${formatAmount(totalAmount)}€` : "—";

    return (
        <Pressable style={styles.row}>
            <View style={styles.rowHeader}>
                <View style={styles.headerLeft}>
                    <Text style={styles.codeLabel}>PEDIDO</Text>
                    <View style={styles.codeRow}>
                        <Text style={styles.codeValue}>#{order.code}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
                            <Text style={[styles.statusText, { color: statusColor }]}>
                                {statusLabel.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.customerName}>
                        {customerName ?? `Cliente #${order.customerId}`}
                    </Text>
                </View>
                <View style={styles.actions}>
                    <MaterialCommunityIcons
                        name="eye-outline"
                        size={18}
                        color={theme.colors.onSurfaceVariant}
                    />
                    <MaterialCommunityIcons
                        name="pencil-outline"
                        size={18}
                        color={theme.colors.onSurfaceVariant}
                    />
                    <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={18}
                        color={theme.colors.error}
                    />
                </View>
            </View>

            <View style={styles.datesRow}>
                <View style={styles.dateGroup}>
                    <Text style={styles.dateLabel}>Inicio</Text>
                    <Text style={styles.dateText}>{formatDateForDisplay(order.startDate)}</Text>
                </View>

                <View style={[styles.dateGroup, styles.dateGroupEnd]}>
                    <Text style={styles.dateLabel}>Entrega</Text>
                    <Text style={styles.dateText}>{formatDateForDisplay(order.endDate)}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>
                    {unitsText} unidades • {productsText} productos
                </Text>
                <Text style={styles.amountText}>{amountText}</Text>
            </View>

            {order.notes ? (
                <>
                    <View style={styles.divider} />
                    <Text style={styles.noteText}>Nota: {order.notes}</Text>
                </>
            ) : null}
        </Pressable>
    );
}

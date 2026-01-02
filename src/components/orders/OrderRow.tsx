import { Pressable, StyleSheet, View, Text } from "react-native";
import { Order } from "../../types/Order";
import { formatDateForDisplay } from "../../services/utils";

export default function OrderRow({ order }: { order: Order }) {
    const statusColor = order.status === 'ENTREGADO' ? '#4CAF50' : '#FF9800';

    return (
        <Pressable
            style={styles.row}
        >
            <View style={styles.rowHeader}>
                <View style={styles.codeContainer}>
                    <Text style={styles.codeLabel}>PEDIDO</Text>
                    <Text style={styles.codeValue}>#{order.code}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
                    <Text style={[styles.statusText, { color: statusColor }]}>
                        {order.status.toUpperCase()}
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

                <View style={[styles.dateGroup, { alignItems: 'flex-end' }]}>
                    <Text style={styles.dateLabel}>Entrega</Text>
                    <Text style={styles.dateText}>{formatDateForDisplay(order.endDate)}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    rowPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }],
    },
    rowHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    codeContainer: {
        gap: 2,
    },
    codeLabel: {
        fontSize: 10,
        fontWeight: "600",
        color: "#999",
        letterSpacing: 0.5,
    },
    codeValue: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1A1A1A",
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 11,
        fontWeight: "800",
    },
    divider: {
        height: 1,
        backgroundColor: "#F0F0F0",
        marginVertical: 12,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dateGroup: {
        flex: 1,
    },
    dateLabel: {
        fontSize: 10,
        color: "#AAA",
        marginBottom: 2,
        textTransform: 'uppercase',
    },
    dateText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#444",
    },
    arrow: {
        paddingHorizontal: 15,
        color: "#CCC",
        fontSize: 18,
    }
});
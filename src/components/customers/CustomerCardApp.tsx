import { Image, View } from "react-native";
import { Icon, IconButton, Text, useTheme } from "react-native-paper";
import { Customer } from "../../types/Customer";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";

interface CustomerCardAppProps {
    customer: Customer;
}

export default function CustomerCardApp({
    customer
}: CustomerCardAppProps) {
    const theme = useTheme();

    return (
        <View key={customer.id} style={[styles.itemCard, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.itemLeft}>
                <View style={styles.statusBar} />
                <Image
                    source={{
                        uri: "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" + encodeURIComponent(customer.name),
                    }}
                    style={styles.avatar}
                />
                <View style={styles.itemText}>
                    <Text variant="titleMedium">{customer.name}</Text>
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                        {customer.email || "Sin email"}
                    </Text>
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                        {customer.address.city || ""}
                    </Text>
                </View>
            </View>
            <View style={styles.itemRight}>
                <Link
                    href={{
                        pathname: '/customers/[customerId]',
                        params: { customerId: customer.id }
                    }}
                >
                    <Icon source="chevron-right" size={20} />
                </Link>
            </View>
        </View>
    );
}


export const styles = StyleSheet.create({
    itemCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
    },
    statusBar: {
        width: 3,
        height: "100%",
        backgroundColor: "#6dd3a2",
        borderRadius: 3,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    itemText: {
        flex: 1,
    },
    itemRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
});
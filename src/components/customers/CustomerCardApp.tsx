import { Image, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { Customer } from "../../types/Customer";
import { Link } from "expo-router";
import { customerCardStyle } from "../../styles/customers.styles";

interface CustomerCardAppProps {
    customer: Customer;
}

export default function CustomerCardApp({
    customer
}: CustomerCardAppProps) {
    const theme = useTheme();

    return (
        <View key={customer.id} style={[customerCardStyle.itemCard, { backgroundColor: theme.colors.surface }]}>
            <View style={customerCardStyle.itemLeft}>
                <View style={customerCardStyle.statusBar} />
                <Image
                    source={{
                        uri: "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" + encodeURIComponent(customer.name),
                    }}
                    style={customerCardStyle.avatar}
                />
                <View style={customerCardStyle.itemText}>
                    <Text variant="titleMedium">{customer.name}</Text>
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                        {customer.email || "Sin email"}
                    </Text>
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                        {customer.address.city || ""}
                    </Text>
                </View>
            </View>
            <View style={customerCardStyle.itemRight}>
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

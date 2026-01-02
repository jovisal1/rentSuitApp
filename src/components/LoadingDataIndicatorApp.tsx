import { ActivityIndicator, View, Text } from "react-native";
import { emptyStateStyles } from "../styles/common.styles";

export default function LoadingDataIndicatorApp({ message }) {
    return (
        <View style={emptyStateStyles.emptyContainer}>
            <ActivityIndicator />
            <Text style={emptyStateStyles.emptyText}>{message}</Text>
        </View>
    );
}

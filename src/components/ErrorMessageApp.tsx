import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { emptyStateStyles } from "../styles/common.styles";

export default function ErrorMessageApp({ errorMessage }) {
    return (
        <View style={emptyStateStyles.emptyContainer}>
            <MaterialCommunityIcons name="alert-circle-outline" size={40} color="#DDD" />
            <Text style={emptyStateStyles.emptyText}>{errorMessage}</Text>
        </View>
    );
}

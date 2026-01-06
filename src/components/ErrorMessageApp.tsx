import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { getEmptyStateStyles } from "../styles/common.styles";

export default function ErrorMessageApp({ errorMessage }) {
    const theme = useTheme();
    const emptyStyles = useMemo(() => getEmptyStateStyles(theme), [theme]);

    return (
        <View style={emptyStyles.emptyContainer}>
            <MaterialCommunityIcons name="alert-circle-outline" size={40} color={theme.colors.error} />
            <Text style={emptyStyles.emptyText}>{errorMessage}</Text>
        </View>
    );
}
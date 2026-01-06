import { useMemo } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { getEmptyStateStyles } from "@/styles/common.styles";

export default function LoadingDataIndicatorApp({ message }) {
    const theme = useTheme();
    const emptyStyles = useMemo(() => getEmptyStateStyles(theme), [theme]);

    return (
        <View style={emptyStyles.emptyContainer}>
            <ActivityIndicator />
            <Text style={emptyStyles.emptyText}>{message}</Text>
        </View>
    );
}
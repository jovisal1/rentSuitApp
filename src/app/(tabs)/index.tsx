import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../styles/HomeScreen.styles";

export default function HomeScreen() {
    const theme = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.centerContent}>
                <MaterialCommunityIcons name="view-dashboard-outline" size={110} color={theme.colors.primary} />
                <Text variant="headlineLarge" style={styles.title}>
                    Dashboard
                </Text>
            </View>
        </View>
    );
}


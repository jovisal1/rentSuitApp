import { StyleSheet } from "react-native";
import type { MD3Theme } from "react-native-paper";


export const getCustomerCardStyles = (theme: MD3Theme) =>
    StyleSheet.create({
        itemCard: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginBottom: 10,
            backgroundColor: theme.colors.surface,
            shadowColor: theme.colors.shadow,
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
            backgroundColor: theme.colors.primary,
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
import { ComponentProps } from "react";
import { Platform, StyleSheet } from "react-native";
import { FAB, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { themeApp } from "@/theme";

type FabProps = ComponentProps<typeof FAB>;


export function FloatingFabApp({
    style,
    size = "medium",
    ...rest
}: FabProps) {
    const theme = useTheme();
    //const tabBarHeight = useBottomTabBarHeight();
    const { bottom } = useSafeAreaInsets();

    const webFabOffset = Platform.OS === "web" ? 12 : 0;
    const fabBottom = 60 + bottom + webFabOffset;
    const smallFabOffset = 56;
    const backgroundColor =
        size === "small" ? "#F0F1F5" : theme.colors.primary;
    const bottomSpace = size === "small" ? fabBottom + smallFabOffset : fabBottom;
    const right = size === "small" ? 27 : 20;
    const textColor = size === "small" ? themeApp.colors.primary : "white";
    const marginBottom = size === "small" ? 10 : 0;

    return (

        <FAB
            style={[
                styles.fab,
                { bottom: bottomSpace },
                { right },
                { marginBottom },
                { backgroundColor },
                style
            ]}
            color={textColor}
            size={size}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        alignItems: "center",
        borderRadius: 30,
        elevation: 3,
    },
});



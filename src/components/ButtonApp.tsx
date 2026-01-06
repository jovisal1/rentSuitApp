import { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";

type ButtonProps = ComponentProps<typeof Button>;

export function ButtonApp({ style, labelStyle, mode = "contained", ...rest }: ButtonProps) {
    const theme = useTheme();

    return (
        <Button
            mode={mode}
            style={[styles.button, { backgroundColor: theme.colors.primary }, style]}
            labelStyle={[styles.label, labelStyle]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 12,
        marginBottom: 8,
        borderRadius: 5,
        paddingVertical: 4,
    },
    label: {
        fontSize: 16,
        letterSpacing: 0.5,
    },
});

import { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import { HelperText, TextInput, useTheme } from "react-native-paper";

type BaseProps = ComponentProps<typeof TextInput>;

type Props = BaseProps & {
    errorText?: string;
};

export function TextInputApp({
    style,
    mode = "outlined",
    errorText,
    ...rest
}: Props) {
    const theme = useTheme();
    const hasError = Boolean(errorText);

    return (
        <View style={styles.wrapper}>
            <TextInput
                mode={mode}
                error={hasError}
                style={[styles.input, { backgroundColor: theme.colors.surface }, style]}
                {...rest}
            />

            <HelperText type="error" visible={hasError} style={styles.helper}>
                {errorText}
            </HelperText>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 6,
    },
    input: {
        marginBottom: 0,
        height: 32
    },
    helper: {
        marginTop: -2,
    },
});
import { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type Props = ComponentProps<typeof Button>;

export function LinkButtonApp({ style, labelStyle, mode = "text", compact = true, ...rest }: Props) {
    return (
        <Button
            mode={mode}
            compact={compact}
            style={style}
            labelStyle={[styles.label, labelStyle]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    label: {
        textTransform: "none",
        fontWeight: "600",
    },
});

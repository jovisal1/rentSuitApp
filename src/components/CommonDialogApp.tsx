import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";

type CommonDialogAppProps = {
    visible: boolean;
    title: string;
    message: ReactNode;
    cancelText: string;
    confirmText: string;
    onCancel: () => void;
    onConfirm: () => void;
    cancelDisabled?: boolean;
    confirmDisabled?: boolean;
    confirmLoading?: boolean;
};

export function CommonDialogApp({
    visible,
    title,
    message,
    cancelText,
    confirmText,
    onCancel,
    onConfirm,
    cancelDisabled,
    confirmDisabled,
    confirmLoading
}: CommonDialogAppProps) {
    const theme = useTheme();
    const styles = useStyles(theme);
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onCancel} style={styles.dialog}>
                <Dialog.Title style={styles.title}>{title}</Dialog.Title>
                <Dialog.Content style={styles.content}>
                    {typeof message === "string" ? (
                        <Text style={styles.message}>{message}</Text>
                    ) : (
                        message
                    )}
                </Dialog.Content>
                <Dialog.Actions style={styles.actions}>
                    <View style={styles.actionsRow}>
                        <Button
                            mode="outlined"
                            onPress={onCancel}
                            disabled={cancelDisabled}
                            style={styles.button}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            mode="contained"
                            onPress={onConfirm}
                            disabled={confirmDisabled}
                            loading={confirmLoading}
                            style={styles.button}
                        >
                            {confirmText}
                        </Button>
                    </View>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const useStyles = (theme) =>
    StyleSheet.create({
        dialog: {
            borderRadius: 16,
            backgroundColor: theme.colors.surface,
        },
        title: {
            fontWeight: "700",
            color: theme.colors.primary,
        },
        content: {
            paddingTop: 4,
        },
        message: {
            color: theme.colors.onSurfaceVariant,
            lineHeight: 20,
        },
        actions: {
            paddingHorizontal: 16,
            paddingBottom: 16,
        },
        actionsRow: {
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 8,
        },
        button: {
            minWidth: 96,
            borderRadius: 5,
        },
    });

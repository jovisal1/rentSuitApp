import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { Portal, Snackbar } from "react-native-paper";

type SnackbarPayload = {
    message: string;
    duration?: number;
    actionLabel?: string;
    onAction?: () => void;
};

type SnackbarContextValue = {
    show: (payload: SnackbarPayload) => void;
    hide: () => void;
};

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
    const [visible, setVisible] = useState(false);
    const [payload, setPayload] = useState<SnackbarPayload>({ message: "" });
    const actionRef = useRef<(() => void) | undefined>(undefined);
    const show = useCallback((next: SnackbarPayload) => {
        actionRef.current = next.onAction;
        setPayload(next);
        setVisible(true);
    }, []);

    const hide = useCallback(() => {
        setVisible(false);
    }, []);

    const value = useMemo(() => ({ show, hide }), [show, hide]);
    const action = payload.actionLabel
        ? {
            label: payload.actionLabel,
            onPress: () => {
                hide();
                actionRef.current?.();
            },
        }
        : undefined;

    return (
        <SnackbarContext.Provider value={value}>
            {children}
            <Portal>
                <Snackbar
                    visible={visible}
                    onDismiss={hide}
                    duration={payload.duration ?? 2500}
                    action={action}
                    style={{ marginHorizontal: 12, marginBottom: 12 }}
                >
                    {payload.message}
                </Snackbar>
            </Portal>
        </SnackbarContext.Provider>
    );
}

export function useAppSnackbar() {
    const ctx = useContext(SnackbarContext);
    if (!ctx) throw new Error("useAppSnackbar debe ser utilizado dentro de <SnackbarProvider />");
    return ctx;
}

import { createContext, PropsWithChildren, useContext } from "react";
import { useNotifications } from "@/hooks/useNotifications";

type NotificationsState = ReturnType<typeof useNotifications>;

const NotificationsContext = createContext<NotificationsState | null>(null);

export function NotificationsProvider({ children }: PropsWithChildren) {
    const notifications = useNotifications();

    return (
        <NotificationsContext.Provider value={notifications}>
            {children}
        </NotificationsContext.Provider>
    );
}

export function useNotificationsContext() {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error("useNotificationsContext debe usarse dentro de NotificationsProvider");
    }
    return context;
}

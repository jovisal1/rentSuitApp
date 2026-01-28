import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

// Se registra un manejador global para las notificaciones
Notifications.setNotificationHandler({
    // Función que se ejecuta cada vez que llega una notificación
    handleNotification: async () => ({
        // Reproduce el sonido de notificación
        shouldPlaySound: true,
        // Actualiza el badge del ícono de la app (iOS principalmente)
        shouldSetBadge: true,
        // Muestra el banner de la notificación (iOS)
        shouldShowBanner: true,
        // Muestra la notificación en el centro/lista de notificaciones
        shouldShowList: true,
    }),
});

type UseNotificationsOptions = {
    androidChannelId?: string;
    androidChannel?: Notifications.NotificationChannelInput;
    onNotification?: (notification: Notifications.Notification) => void;
    onResponse?: (response: Notifications.NotificationResponse) => void;
    requestPermissionsOnMount?: boolean;
};

export function useNotifications(options: UseNotificationsOptions = {}) {
    const {
        androidChannelId = "default",
        androidChannel,
        onNotification,
        onResponse,
        requestPermissionsOnMount = true,
    } = options;

    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
    const [notification, setNotification] = useState<Notifications.Notification | null>(null);
    const [notificationResponse, setNotificationResponse] =
        useState<Notifications.NotificationResponse | null>(null);
    const [permissionStatus, setPermissionStatus] =
        useState<Notifications.PermissionStatus | null>(null);
    const [error, setError] = useState<string | null>(null);


    const registerForPushNotificationsAsync = useCallback(async () => {
        setError(null);
        console.log("[notifications] Registro iniciado");

        // Canal para Android (necesario para que se muestren notificaciones)
        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync(
                androidChannelId,
                androidChannel ?? {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#FF231F7C",
                }
            );
        }

        // El token de push solo funciona en dispositivo físico
        console.log("[notifications] Device.isDevice:", Device.isDevice);
        if (!Device.isDevice) {
            const message = "Debes usar un dispositivo físico para recibir notificaciones push";
            setError(message);
            return null;
        }

        // Solicita permisos si aún no están concedidos
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        console.log("[notifications] Permiso actual:", existingStatus);
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        setPermissionStatus(finalStatus);
        console.log("[notifications] Permiso final:", finalStatus);

        if (finalStatus !== "granted") {
            const message = "Permiso no concedido para obtener el token de notificaciones push";
            setError(message);
            return null;
        }

        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        console.log("[notifications] projectId:", projectId);
        if (!projectId) {
            const message = "No se encontró el projectId de EAS";
            setError(message);
            return null;
        }

        try {
            // Obtiene el token Expo para notificaciones push
            console.log("[notifications] Solicitando token Expo...");
            const tokenResponse = await Notifications.getExpoPushTokenAsync({ projectId });
            setExpoPushToken(tokenResponse.data);
            console.log("[notifications] Expo push token:", tokenResponse.data);
            return tokenResponse.data;
        } catch (err) {
            console.error("[notifications] Error obteniendo el token:", err);
            setError(`Error obteniendo el token: ${String(err)}`);
            return null;
        }
    }, [androidChannel, androidChannelId]);

    useEffect(() => {
        // Pide permisos y registra el token al montar (opcional)
        if (requestPermissionsOnMount) {
            void registerForPushNotificationsAsync();
        }
    }, [registerForPushNotificationsAsync, requestPermissionsOnMount]);


    //MANEJO DE NOTIFICACIONES ENTRANTES
    useEffect(() => {
        // Listener: notificación recibida mientras la app está en primer plano
        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification);
            setNotification(notification);
            onNotification?.(notification);
        });

        // Listener: respuesta del usuario al interactuar con la notificación
        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
            setNotificationResponse(response);
            onResponse?.(response);
        });

        // Limpieza de listeners al desmontar
        return () => {
            notificationListener.remove();
            responseListener.remove();
        };
    }, [onNotification, onResponse]);

    return {
        expoPushToken,
        notification,
        notificationResponse,
        permissionStatus,
        error,
        registerForPushNotificationsAsync,
    };
}

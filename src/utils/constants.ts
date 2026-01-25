import type { OrderStatus } from "@/types/Order";

export const APP_FONTS = {
    regular: "Poppins-Regular",
    bold: "Poppins-Bold",
} as const;

export const QUERY_STALE_TIME_MS = 30_000;
export const DEFAULT_ROLE_ID = 1;
export const AVATAR_BUCKET = "avatars";

export const ORDER_STATUS_META: Record<OrderStatus, { color: string; label: string }> = {
    PREPARADO: { color: "#2196F3", label: "Preparado" },
    ENTREGADO: { color: "#4CAF50", label: "Entregado" },
    DEVUELTO: { color: "#9C27B0", label: "Devuelto" },
    PENDIENTE_REVISION: { color: "#FF9800", label: "Pendiente revision" },
    FINALIZADO: { color: "#607D8B", label: "Finalizado" },
};

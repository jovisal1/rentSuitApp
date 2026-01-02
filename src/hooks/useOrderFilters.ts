import { useCallback, useMemo, useState } from "react";
import type { Order, OrderStatus } from "../types/Order";

export type StatusFilter = OrderStatus | "ALL";

function parseOrderDate(value: string | undefined): Date | null {
    if (!value) return null;
    const d = new Date(value);
    return Number.isFinite(d.getTime()) ? d : null;
}

function getOrderSearchText(order: Order): string {
    const parts = [
        String(order.id),
        order.code,
        String(order.customerId),
        order.notes ?? "",
    ];
    return parts.join(" ");
}

export function useOrderFilters(
    orders: Order[],
    initial?: Partial<{
        isOpen: boolean;
        text: string;
        startDateFrom: Date | null;
        endDateTo: Date | null;
        status: StatusFilter;
    }>,
) {
    const [filtersOpen, setFiltersOpen] = useState<boolean>(initial?.isOpen ?? false);
    const [text, setText] = useState<string>(initial?.text ?? "");
    const [startDateFrom, setStartDateFrom] = useState<Date | null>(initial?.startDateFrom ?? null);
    const [endDateTo, setEndDateTo] = useState<Date | null>(initial?.endDateTo ?? null);
    const [status, setStatus] = useState<StatusFilter>(initial?.status ?? "ALL");

    const filteredOrders = useMemo(() => {
        const q = text.trim().toLowerCase();

        return orders.filter((order) => {
            if (q) {
                const hay = getOrderSearchText(order).trim().toLowerCase();
                if (!hay.includes(q)) return false;
            }

            if (status !== "ALL") {
                if (order.status !== status) return false;
            }

            if (startDateFrom) {
                const start = parseOrderDate(order.startDate);
                if (!start) return false;
                if (start.getTime() < startDateFrom.getTime()) return false;
            }

            if (endDateTo) {
                const end = parseOrderDate(order.endDate);
                if (!end) return false;
                if (end.getTime() > endDateTo.getTime()) return false;
            }

            return true;
        });
    }, [orders, text, status, startDateFrom, endDateTo]);

    const activeAdvancedCount = useMemo(() => {
        return (startDateFrom ? 1 : 0) + (endDateTo ? 1 : 0) + (status !== "ALL" ? 1 : 0);
    }, [startDateFrom, endDateTo, status]);

    // const openFilters = useCallback(() => setFiltersOpen(true), []);
    // const closeFilters = useCallback(() => setFiltersOpen(false), []);
    const toggleFilters = useCallback(() => setFiltersOpen((v) => !v), []);

    const clearAdvancedFilters = useCallback(() => {
        setStartDateFrom(null);
        setEndDateTo(null);
        setStatus("ALL");
    }, []);

    const clearAllFilters = useCallback(() => {
        setText("");
        setStartDateFrom(null);
        setEndDateTo(null);
        setStatus("ALL");
    }, []);

    return {
        // state
        filtersOpen,
        text,
        startDateFrom,
        endDateTo,
        status,
        filteredOrders,
        activeAdvancedCount,

        // setters 
        setFiltersOpen,
        setText,
        setStartDateFrom,
        setEndDateTo,
        setStatus,

        // helpers
        toggleFilters,
        clearAdvancedFilters,
        clearAllFilters,
    };
}

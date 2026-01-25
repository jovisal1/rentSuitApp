import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/oderService";
import { ordersQueryKey } from "@/hooks/queries/queryKeys";

export function useOrdersQuery(enabled = true) {
    return useQuery({
        queryKey: ordersQueryKey,
        queryFn: getOrders,
        enabled,
    });
}

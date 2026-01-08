import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/oderService";
import { ordersQueryKey } from "@/hooks/queries/queryKeys";

export function useOrdersQuery() {
    return useQuery({
        queryKey: ordersQueryKey,
        queryFn: getOrders,
    });
}

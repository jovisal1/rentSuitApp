import { useQuery } from "@tanstack/react-query";
import { getOrdersByCustomerId } from "@/services/oderService";
import { ordersByCustomerQueryKey } from "@/hooks/queries/queryKeys";

export function useOrdersByCustomerQuery(customerId: number, enabled = true) {
    return useQuery({
        queryKey: ordersByCustomerQueryKey(customerId),
        queryFn: () => getOrdersByCustomerId(customerId),
        enabled,
    });
}

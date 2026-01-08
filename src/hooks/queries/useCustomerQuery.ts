import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "@/services/customerService";
import { customerQueryKey } from "@/hooks/queries/queryKeys";

export function useCustomerQuery(customerId: number, enabled = true) {
    return useQuery({
        queryKey: customerQueryKey(customerId),
        queryFn: () => getCustomerById(customerId),
        enabled,
    });
}

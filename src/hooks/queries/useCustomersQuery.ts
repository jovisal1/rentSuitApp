import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/services/customerService";
import { customersQueryKey } from "@/hooks/queries/queryKeys";

export function useCustomersQuery() {
    return useQuery({
        queryKey: customersQueryKey,
        queryFn: getCustomers,
    });
}

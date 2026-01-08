export const customersQueryKey = ["customers"] as const;
export const customerQueryKey = (id: number) => ["customers", id] as const;
export const ordersQueryKey = ["orders"] as const;
export const ordersByCustomerQueryKey = (customerId: number) =>
    ["orders", "customer", customerId] as const;

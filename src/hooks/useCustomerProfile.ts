import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

import { Customer, emptyCustomer } from "@/types/Customer";
import { createCustomer, deleteCustomer } from "@/services/customerService";
import { useCustomerQuery } from "@/hooks/queries/useCustomerQuery";
import { customersQueryKey, customerQueryKey } from "@/hooks/queries/queryKeys";

export function useCustomerProfile() {
    const { customerId } = useLocalSearchParams<{ customerId?: string }>();
    const isCreating = customerId === "new";

    const [activeTab, setActiveTab] = useState("Datos de contacto");
    const [isEditing, setIsEditing] = useState(false);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const queryClient = useQueryClient();

    const numericCustomerId = Number(customerId);
    const canFetchCustomer = !isCreating && Number.isFinite(numericCustomerId);
    const {
        data: customerData,
        isLoading: isCustomerLoading,
        isError: isCustomerError,
    } = useCustomerQuery(numericCustomerId, canFetchCustomer);

    useEffect(() => {
        if (isCreating) {
            setActiveTab("Datos de contacto");
            setCustomer({ ...emptyCustomer });
            setIsEditing(true);
            return;
        }

        if (isCustomerError) {
            setCustomer(null);
            return;
        }

        if (customerData && !isEditing) {
            setCustomer(customerData);
        }
    }, [customerData, isCreating, isCustomerError, isEditing]);

    const handleDeleteCustomer = async () => {
        if (!customer) return;

        try {
            setIsDeleting(true);
            setConfirmVisible(false);

            await deleteCustomer(customer.id);
            await queryClient.invalidateQueries({ queryKey: customersQueryKey });

            // Volver al listado
            router.back();
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCreateCustomer = async (draft: Customer) => {
        const created = await createCustomer(draft);
        await queryClient.invalidateQueries({ queryKey: customersQueryKey });
        await queryClient.invalidateQueries({ queryKey: customerQueryKey(created.id) });
        router.replace({
            pathname: "/customers/[customerId]",
            params: { customerId: created.id },
        });
        return created;
    };

    const handleCancelCreate = () => {
        router.back();
    };

    return {
        activeTab,
        setActiveTab,
        isEditing,
        setIsEditing,
        customer,
        setCustomer,
        isLoading: isCreating ? false : isCustomerLoading,
        confirmVisible,
        setConfirmVisible,
        isDeleting,
        isCreating,
        handleDeleteCustomer,
        handleCreateCustomer,
        handleCancelCreate,
    };
}

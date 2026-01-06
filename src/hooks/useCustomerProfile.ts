import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

import { Customer, emptyCustomer } from "@/types/Customer";
import { createCustomer, deleteCustomer, getCustomerById } from "@/services/customerService";

export function useCustomerProfile() {
    const { customerId } = useLocalSearchParams<{ customerId?: string }>();
    const isCreating = customerId === "new";

    const [activeTab, setActiveTab] = useState("Datos de contacto");
    const [isEditing, setIsEditing] = useState(false);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadCustomer = async () => {
            setIsLoading(true);
            if (isCreating) {
                if (isMounted) {
                    setActiveTab("Datos de contacto");
                    setCustomer({ ...emptyCustomer });
                    setIsEditing(true);
                    setIsLoading(false);
                }
                return;
            }
            const id = Number(customerId);
            if (!Number.isFinite(id)) {
                if (isMounted) {
                    setCustomer(null);
                    setIsLoading(false);
                }
                return;
            }

            const data = await getCustomerById(id);
            if (isMounted) {
                setCustomer(data ?? null);
                setIsLoading(false);
            }
        };

        loadCustomer();

        return () => {
            isMounted = false;
        };
    }, [customerId, isCreating]);

    const handleDeleteCustomer = async () => {
        if (!customer) return;

        try {
            setIsDeleting(true);
            setConfirmVisible(false);

            await deleteCustomer(customer.id);

            // Volver al listado
            router.back();
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCreateCustomer = async (draft: Customer) => {
        const created = await createCustomer(draft);
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
        isLoading,
        confirmVisible,
        setConfirmVisible,
        isDeleting,
        isCreating,
        handleDeleteCustomer,
        handleCreateCustomer,
        handleCancelCreate,
    };
}

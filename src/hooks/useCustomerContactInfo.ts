import { useMemo, useState } from "react";
import { customerSchema } from "@/schemas/customer.schema";
import { FieldErrors, zodIssuesToFieldErrors } from "@/schemas/utils";
import { useAppSnackbar } from "@/providers/SnackBarProvider";
import { updateCustomer } from "@/services/customerService";
import { Customer } from "@/types/Customer";

type UseCustomerContactInfoParams = {
    customer: Customer;
    setCustomer: (customer: Customer) => void;
    setIsEditing: (value: boolean) => void;
    onSave?: (customer: Customer) => Promise<Customer | undefined>;
    onCancel?: () => void;
    successMessage?: string;
    errorMessage?: string;
};

export function useCustomerContactInfo({
    customer,
    setCustomer,
    setIsEditing,
    onSave,
    onCancel,
    successMessage,
    errorMessage,
}: UseCustomerContactInfoParams) {
    const [tempCustomer, setTempCustomer] = useState<Customer>({ ...customer });
    const [errors, setErrors] = useState<FieldErrors>({});
    const [isSaving, setIsSaving] = useState(false);
    const { show } = useAppSnackbar();
    const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

    const clearError = (path: string) => {
        setErrors((prev) => {
            if (!prev[path]) return prev;
            const next = { ...prev };
            delete next[path];
            return next;
        });
    };

    const handleEdit = () => {
        setTempCustomer(JSON.parse(JSON.stringify(customer)));
        setErrors({});
        setIsEditing(true);
    };

    const handleCancel = () => {
        if (isSaving) return;
        if (onCancel) {
            onCancel();
            return;
        }
        setCustomer(tempCustomer);
        setErrors({});
        setIsEditing(false);
    };

    const handleSave = async () => {
        if (isSaving) return;
        const result = customerSchema.safeParse(customer);
        if (!result.success) {
            setErrors(zodIssuesToFieldErrors(result.error.issues));
            show({ message: "Revisa los campos marcados." });
            return;
        }
        try {
            setIsSaving(true);
            const savedCustomer = onSave
                ? await onSave(customer)
                : await updateCustomer(customer);
            if (!savedCustomer) {
                show({ message: errorMessage ?? "No se pudo guardar el cliente." });
                return;
            }
            setCustomer(savedCustomer);
            setErrors({});
            setIsEditing(false);
            show({ message: successMessage ?? "Cambios guardados.", duration: 2000 });
        } finally {
            setIsSaving(false);
        }
    };

    return {
        errors,
        isSaving,
        hasErrors,
        clearError,
        handleEdit,
        handleCancel,
        handleSave,
    };
}

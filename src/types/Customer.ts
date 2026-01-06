export interface Customer {
    id: number;
    name: string;
    taxId?: string;
    phone?: string;
    email?: string;
    notes?: string;
    active: boolean;
    address: CustomerAddress
}

export interface CustomerAddress {
    id: number;
    alias?: string;
    line1: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    isPrimary: boolean;
}


export const emptyCustomer: Customer = {
    id: 0,
    name: "",
    taxId: "",
    phone: "",
    email: "",
    notes: "",
    active: true,
    address: {
        id: 0,
        line1: "",
        city: "",
        postalCode: "",
        isPrimary: true,
    },
};
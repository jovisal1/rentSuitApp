import { Customer, CustomerAddress } from "@/types/Customer";
import { supabase } from "@/config/supabaseClient";

type CustomerRow = {
    id: number;
    name: string;
    tax_id: string | null;
    phone: string | null;
    email: string | null;
    notes: string | null;
    active: boolean;
    customer_addresses?: CustomerAddressRow[];
};

type CustomerAddressRow = {
    id: number;
    customer_id: number;
    alias: string | null;
    line1: string | null;
    line2: string | null;
    city: string | null;
    state: string | null;
    postal_code: string | null;
    country: string | null;
    latitude: number | null;
    longitude: number | null;
    is_primary: boolean;
};

const mapAddress = (row?: CustomerAddressRow | null): CustomerAddress => ({
    id: row?.id ?? 0,
    alias: row?.alias ?? undefined,
    line1: row?.line1 ?? "",
    line2: row?.line2 ?? undefined,
    city: row?.city ?? undefined,
    state: row?.state ?? undefined,
    postalCode: row?.postal_code ?? undefined,
    country: row?.country ?? undefined,
    latitude: row?.latitude ?? undefined,
    longitude: row?.longitude ?? undefined,
    isPrimary: row?.is_primary ?? true,
});

const mapCustomer = (row: CustomerRow): Customer => {
    const addressRow =
        row.customer_addresses?.find((address) => address.is_primary) ??
        row.customer_addresses?.[0];

    return {
        id: row.id,
        name: row.name,
        taxId: row.tax_id ?? undefined,
        phone: row.phone ?? undefined,
        email: row.email ?? undefined,
        notes: row.notes ?? undefined,
        active: row.active,
        address: mapAddress(addressRow),
    };
};

export const getCustomers = async (): Promise<Customer[]> => {
    const { data, error } = await supabase
        .from("customers")
        .select("id, name, tax_id, phone, email, notes, active, customer_addresses(*)");

    if (error || !data) {
        throw new Error("No se pudieron cargar los clientes.");
    }

    return data.map(mapCustomer);
};

export const getCustomerById = async (id: number): Promise<Customer | undefined> => {
    const { data, error } = await supabase
        .from("customers")
        .select("id, name, tax_id, phone, email, notes, active, customer_addresses(*)")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw new Error("No se pudo cargar el cliente.");
    }

    return data ? mapCustomer(data) : undefined;
};

export const updateCustomer = async (payload: Customer): Promise<Customer | undefined> => {
    const { error: updateError } = await supabase
        .from("customers")
        .update({
            name: payload.name,
            tax_id: payload.taxId ?? null,
            phone: payload.phone ?? null,
            email: payload.email ?? null,
            notes: payload.notes ?? null,
            active: payload.active,
        })
        .eq("id", payload.id);

    if (updateError) {
        throw new Error("No se pudo guardar el cliente.");
    }

    const addressPayload = {
        alias: payload.address.alias ?? null,
        line1: payload.address.line1,
        line2: payload.address.line2 ?? null,
        city: payload.address.city ?? null,
        state: payload.address.state ?? null,
        postal_code: payload.address.postalCode ?? null,
        country: payload.address.country ?? null,
        latitude: payload.address.latitude ?? null,
        longitude: payload.address.longitude ?? null,
        is_primary: payload.address.isPrimary ?? true,
    };

    if (payload.address.id) {
        const { error: addressError } = await supabase
            .from("customer_addresses")
            .update(addressPayload)
            .eq("id", payload.address.id);

        if (addressError) {
            throw new Error("No se pudo guardar la dirección.");
        }
    } else {
        const { error: insertAddressError } = await supabase
            .from("customer_addresses")
            .insert({
                customer_id: payload.id,
                ...addressPayload,
            });

        if (insertAddressError) {
            throw new Error("No se pudo guardar la dirección.");
        }
    }

    return getCustomerById(payload.id);
};

export const deleteCustomer = async (id: number): Promise<boolean> => {
    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (error) {
        throw new Error("No se pudo eliminar el cliente.");
    }
    return true;
};

export const createCustomer = async (payload: Customer): Promise<Customer> => {
    const { data, error } = await supabase
        .from("customers")
        .insert({
            name: payload.name,
            tax_id: payload.taxId ?? null,
            phone: payload.phone ?? null,
            email: payload.email ?? null,
            notes: payload.notes ?? null,
            active: payload.active ?? true,
        })
        .select("id, name, tax_id, phone, email, notes, active")
        .single();

    if (error || !data) {
        throw new Error("No se pudo crear el cliente.");
    }

    const { data: addressData, error: addressError } = await supabase
        .from("customer_addresses")
        .insert({
            customer_id: data.id,
            alias: payload.address.alias ?? null,
            line1: payload.address.line1,
            line2: payload.address.line2 ?? null,
            city: payload.address.city ?? null,
            state: payload.address.state ?? null,
            postal_code: payload.address.postalCode ?? null,
            country: payload.address.country ?? null,
            latitude: payload.address.latitude ?? null,
            longitude: payload.address.longitude ?? null,
            is_primary: payload.address.isPrimary ?? true,
        })
        .select("id")
        .single();

    if (addressError) {
        throw new Error("No se pudo crear la dirección.");
    }

    return {
        id: data.id,
        name: data.name,
        taxId: data.tax_id ?? undefined,
        phone: data.phone ?? undefined,
        email: data.email ?? undefined,
        notes: data.notes ?? undefined,
        active: data.active,
        address: mapAddress({
            id: addressData?.id ?? 0,
            customer_id: data.id,
            alias: payload.address.alias ?? null,
            line1: payload.address.line1,
            line2: payload.address.line2 ?? null,
            city: payload.address.city ?? null,
            state: payload.address.state ?? null,
            postal_code: payload.address.postalCode ?? null,
            country: payload.address.country ?? null,
            latitude: payload.address.latitude ?? null,
            longitude: payload.address.longitude ?? null,
            is_primary: payload.address.isPrimary ?? true,
        }),
    };
};

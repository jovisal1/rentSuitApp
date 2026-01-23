import { Order } from "@/types/Order";
import { supabase } from "@/config/supabaseClient";

type OrderRow = {
    id: number;
    code: string;
    customer_id: number;
    delivery_address_id: number | null;
    pickup_address_id: number | null;
    start_date: string;
    end_date: string;
    status: Order["status"];
    created_by: number;
    notes: string | null;
};

const mapOrder = (row: OrderRow): Order => ({
    id: row.id,
    code: row.code,
    customerId: row.customer_id,
    deliveryAddressId: row.delivery_address_id ?? undefined,
    pickupAddressId: row.pickup_address_id ?? undefined,
    startDate: row.start_date,
    endDate: row.end_date,
    status: row.status,
    createdBy: row.created_by,
    notes: row.notes ?? undefined,
});

export const getOrders = async (): Promise<Order[]> => {
    const { data, error } = await supabase
        .from("orders")
        .select("id, code, customer_id, delivery_address_id, pickup_address_id, start_date, end_date, status, created_by, notes")
        .order("start_date", { ascending: false });

    if (error || !data) {
        throw new Error("No se pudieron cargar los pedidos.");
    }

    return data.map(mapOrder);
};

export const getOrdersByCustomerId = async (customerId: number): Promise<Order[]> => {
    const { data, error } = await supabase
        .from("orders")
        .select("id, code, customer_id, delivery_address_id, pickup_address_id, start_date, end_date, status, created_by, notes")
        .eq("customer_id", customerId)
        .order("start_date", { ascending: false });

    if (error || !data) {
        throw new Error("No se pudieron cargar los pedidos.");
    }

    return data.map(mapOrder);
};

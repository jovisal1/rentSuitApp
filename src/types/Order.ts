import { Customer, CustomerAddress } from "@/types/Customer";
import { Product, ProductSize } from "@/types/Product";

export type OrderStatus =
    | 'PREPARADO'
    | 'ENTREGADO'
    | 'DEVUELTO'
    | 'PENDIENTE_REVISION'
    | 'FINALIZADO';

export interface Order {
    id: number;
    code: string;
    customerId: number;
    deliveryAddressId?: number;
    pickupAddressId?: number;
    startDate: string;
    endDate: string;
    status: OrderStatus;
    createdBy: number;
    notes?: string;
}

export interface OrderLine {
    id: number;
    orderId: number;
    productId: number;
    pricePerDay: number;
    rentalDays: number;
    quantityTotal: number;
    lineAmount: number;
}

export interface OrderLineSize {
    id: number;
    orderLineId: number;
    sizeId: number;
    quantity: number;
}

export interface OrderStatusHistory {
    id: number;
    orderId: number;
    previousStatus?: OrderStatus;
    newStatus: OrderStatus;
    changedBy: number;
    changedAt: string;
    notes?: string;
}

export interface OrderLineWithDetail extends OrderLine {
    product: Product;
    sizes: Array<{
        size: ProductSize;
        quantity: number;
    }>;
}

export interface OrderWithDetail extends Order {
    customer: Customer;
    deliveryAddress?: CustomerAddress;
    pickupAddress?: CustomerAddress;
    lines: OrderLineWithDetail[];
    totalUnits: number;
    totalAmount: number;
}
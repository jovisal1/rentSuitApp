import { Order, OrderLine, OrderLineSize, OrderStatusHistory } from "../Order";


// -----------------------------------------------------
// ORDERS
// -----------------------------------------------------


export const orders: Order[] = [
    {
        id: 1,
        code: 'P-001',
        customerId: 1,
        deliveryAddressId: 1,
        pickupAddressId: 1,
        startDate: '2025-12-10',
        endDate: '2025-12-14',
        status: 'PREPARADO',
        createdBy: 2,
        notes: 'Delivery in the morning',
    },
    {
        id: 2,
        code: 'P-002',
        customerId: 2,
        deliveryAddressId: 2,
        pickupAddressId: 2,
        startDate: '2025-12-08',
        endDate: '2025-12-11',
        status: 'ENTREGADO',
        createdBy: 2,
    },
    {
        id: 3,
        code: 'P-003',
        customerId: 3,
        deliveryAddressId: 3,
        pickupAddressId: 3,
        startDate: '2025-12-05',
        endDate: '2025-12-09',
        status: 'PENDIENTE_REVISION',
        createdBy: 1,
        notes: 'Check possible tent damage',
    },
    {
        id: 4,
        code: 'P-004',
        customerId: 1,
        deliveryAddressId: 1,
        pickupAddressId: 1,
        startDate: '2025-12-01',
        endDate: '2025-12-03',
        status: 'FINALIZADO',
        createdBy: 2,
    },
];

// -----------------------------------------------------
// ORDER LINES
// -----------------------------------------------------

export const orderLines: OrderLine[] = [
    // Order 1 – Helmets + Suit
    {
        id: 1,
        orderId: 1,
        productId: 1,   // Helmet
        pricePerDay: 8,
        rentalDays: 4,
        quantityTotal: 3,
        lineAmount: 3 * 8 * 4,
    },
    {
        id: 2,
        orderId: 1,
        productId: 2,   // Suit
        pricePerDay: 12,
        rentalDays: 4,
        quantityTotal: 2,
        lineAmount: 2 * 12 * 4,
    },

    // Order 2 – Helmets only
    {
        id: 3,
        orderId: 2,
        productId: 1,
        pricePerDay: 8,
        rentalDays: 3,
        quantityTotal: 3,
        lineAmount: 3 * 8 * 3,
    },

    // Order 3 – Suits + Tent + Helmets
    {
        id: 4,
        orderId: 3,
        productId: 2,
        pricePerDay: 12,
        rentalDays: 4,
        quantityTotal: 6,
        lineAmount: 6 * 12 * 4,
    },
    {
        id: 5,
        orderId: 3,
        productId: 3,
        pricePerDay: 35,
        rentalDays: 4,
        quantityTotal: 2,
        lineAmount: 2 * 35 * 4,
    },
    {
        id: 6,
        orderId: 3,
        productId: 1,
        pricePerDay: 8,
        rentalDays: 4,
        quantityTotal: 6,
        lineAmount: 6 * 8 * 4,
    },

    // Order 4 – Helmets (historical)
    {
        id: 7,
        orderId: 4,
        productId: 1,
        pricePerDay: 8,
        rentalDays: 2,
        quantityTotal: 2,
        lineAmount: 2 * 8 * 2,
    },
];

// -----------------------------------------------------
// ORDER LINE SIZES
// -----------------------------------------------------

export const orderLineSizes: OrderLineSize[] = [
    // Order 1 — Helmets
    { id: 1, orderLineId: 1, sizeId: 1, quantity: 2 }, // M
    { id: 2, orderLineId: 1, sizeId: 2, quantity: 1 }, // L

    // Order 1 — Suits
    { id: 3, orderLineId: 2, sizeId: 3, quantity: 1 }, // M
    { id: 4, orderLineId: 2, sizeId: 4, quantity: 1 }, // L

    // Order 2 — Helmets
    { id: 5, orderLineId: 3, sizeId: 1, quantity: 1 }, // M
    { id: 6, orderLineId: 3, sizeId: 2, quantity: 2 }, // L

    // Order 3 — Suits
    { id: 7, orderLineId: 4, sizeId: 3, quantity: 4 }, // M
    { id: 8, orderLineId: 4, sizeId: 4, quantity: 2 }, // L

    // Order 3 — Tent XL
    { id: 9, orderLineId: 5, sizeId: 5, quantity: 2 }, // XL

    // Order 3 — Helmets
    { id: 10, orderLineId: 6, sizeId: 1, quantity: 3 }, // M
    { id: 11, orderLineId: 6, sizeId: 2, quantity: 3 }, // L

    // Order 4 — Helmets
    { id: 12, orderLineId: 7, sizeId: 1, quantity: 2 }, // M
];

// -----------------------------------------------------
// ORDER STATUS HISTORY
// -----------------------------------------------------

export const orderStatusHistory: OrderStatusHistory[] = [
    {
        id: 1,
        orderId: 3,
        previousStatus: 'DEVUELTO',
        newStatus: 'PENDIENTE_REVISION',
        changedBy: 2,
        changedAt: '2025-12-09T18:30:00Z',
        notes: 'Missing photos of the tent',
    },
];

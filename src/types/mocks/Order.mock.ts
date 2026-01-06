import { Order, OrderLine, OrderLineSize, OrderStatusHistory } from "@/types/Order";


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
    {
        id: 5,
        code: 'P-005',
        customerId: 4,
        deliveryAddressId: 4,
        pickupAddressId: 4,
        startDate: '2025-11-20',
        endDate: '2025-11-23',
        status: 'ENTREGADO',
        createdBy: 1,
        notes: 'Entrega en turno de tarde',
    },
    {
        id: 6,
        code: 'P-006',
        customerId: 5,
        deliveryAddressId: 5,
        pickupAddressId: 5,
        startDate: '2025-11-25',
        endDate: '2025-11-29',
        status: 'PREPARADO',
        createdBy: 2,
    },
    {
        id: 7,
        code: 'P-007',
        customerId: 6,
        deliveryAddressId: 6,
        pickupAddressId: 6,
        startDate: '2025-12-02',
        endDate: '2025-12-06',
        status: 'DEVUELTO',
        createdBy: 1,
        notes: 'Devolucion completa',
    },
    {
        id: 8,
        code: 'P-008',
        customerId: 7,
        deliveryAddressId: 7,
        pickupAddressId: 7,
        startDate: '2025-12-12',
        endDate: '2025-12-15',
        status: 'PENDIENTE_REVISION',
        createdBy: 2,
        notes: 'Pendiente de revision de material',
    },
    {
        id: 9,
        code: 'P-009',
        customerId: 8,
        deliveryAddressId: 8,
        pickupAddressId: 8,
        startDate: '2025-11-10',
        endDate: '2025-11-13',
        status: 'FINALIZADO',
        createdBy: 1,
    },
    {
        id: 10,
        code: 'P-010',
        customerId: 9,
        deliveryAddressId: 9,
        pickupAddressId: 9,
        startDate: '2025-11-14',
        endDate: '2025-11-18',
        status: 'ENTREGADO',
        createdBy: 2,
    },
    {
        id: 11,
        code: 'P-011',
        customerId: 10,
        deliveryAddressId: 10,
        pickupAddressId: 10,
        startDate: '2025-12-18',
        endDate: '2025-12-22',
        status: 'PREPARADO',
        createdBy: 1,
        notes: 'Confirmar horario de recogida',
    },
    {
        id: 12,
        code: 'P-012',
        customerId: 2,
        deliveryAddressId: 2,
        pickupAddressId: 2,
        startDate: '2025-11-05',
        endDate: '2025-11-07',
        status: 'FINALIZADO',
        createdBy: 1,
    },
    {
        id: 13,
        code: 'P-013',
        customerId: 3,
        deliveryAddressId: 3,
        pickupAddressId: 3,
        startDate: '2025-11-30',
        endDate: '2025-12-02',
        status: 'ENTREGADO',
        createdBy: 2,
        notes: 'Revisar accesorios incluidos',
    },
    {
        id: 14,
        code: 'P-014',
        customerId: 1,
        deliveryAddressId: 1,
        pickupAddressId: 1,
        startDate: '2025-12-20',
        endDate: '2025-12-24',
        status: 'PREPARADO',
        createdBy: 2,
    },
    {
        id: 15,
        code: 'P-015',
        customerId: 5,
        deliveryAddressId: 5,
        pickupAddressId: 5,
        startDate: '2025-11-01',
        endDate: '2025-11-04',
        status: 'FINALIZADO',
        createdBy: 1,
    },
    {
        id: 16,
        code: 'P-016',
        customerId: 6,
        deliveryAddressId: 6,
        pickupAddressId: 6,
        startDate: '2025-12-07',
        endDate: '2025-12-10',
        status: 'DEVUELTO',
        createdBy: 2,
    },
    {
        id: 17,
        code: 'P-017',
        customerId: 7,
        deliveryAddressId: 7,
        pickupAddressId: 7,
        startDate: '2025-11-22',
        endDate: '2025-11-26',
        status: 'PENDIENTE_REVISION',
        createdBy: 1,
        notes: 'Falta una chaqueta',
    },
    {
        id: 18,
        code: 'P-018',
        customerId: 8,
        deliveryAddressId: 8,
        pickupAddressId: 8,
        startDate: '2025-12-26',
        endDate: '2025-12-29',
        status: 'ENTREGADO',
        createdBy: 2,
    },
    {
        id: 19,
        code: 'P-019',
        customerId: 9,
        deliveryAddressId: 9,
        pickupAddressId: 9,
        startDate: '2025-12-28',
        endDate: '2026-01-02',
        status: 'PREPARADO',
        createdBy: 1,
        notes: 'Pedido para cierre de anio',
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

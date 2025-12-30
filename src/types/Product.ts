export interface Product {
    id: number;
    name: string;
    description?: string;
    pricePerDay: number;
    active: boolean;
}

export interface ProductSize {
    id: number;
    productId: number;
    sizeCode: string;
    description?: string;
    active: boolean;
}

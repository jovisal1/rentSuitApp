import { Order } from "@/types/Order";
import { orders as mockOrders } from "@/types/mocks/Order.mock";

const ordersDb: Order[] = [...mockOrders];

export const getOrders = async (): Promise<Order[]> => {
    return Promise.resolve([...ordersDb]);
};

export const getOrdersByCustomerId = async (customerId: number): Promise<Order[]> => {
    return Promise.resolve(ordersDb.filter((order) => order.customerId === customerId));
};

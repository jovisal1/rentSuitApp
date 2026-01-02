import { Order } from "../types/Order";
import { orders as mockOrders } from "../types/mocks/Order.mock";

const ordersDb: Order[] = [...mockOrders];

export const getOrders = async (): Promise<Order[]> => {
    return Promise.resolve([...ordersDb]);
};

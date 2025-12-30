import { Customer } from "../types/Customer";
import { customers as mockCustomers } from "../types/mocks/Customer.mock";

const customersDb: Customer[] = [...mockCustomers];

export const getCustomers = async (): Promise<Customer[]> => {
    return Promise.resolve([...customersDb]);
};

export const getCustomerById = async (
    id: number
): Promise<Customer | undefined> => {
    const customer = customersDb.find((item) => item.id === id);
    return Promise.resolve(customer ? { ...customer } : undefined);
};

export const updateCustomer = async (
    payload: Customer
): Promise<Customer | undefined> => {
    const index = customersDb.findIndex((item) => item.id === payload.id);

    if (index === -1) {
        return Promise.resolve(undefined);
    }

    customersDb[index] = { ...payload };
    return Promise.resolve({ ...customersDb[index] });
};

export const deleteCustomer = async (id: number): Promise<boolean> => {
    const index = customersDb.findIndex((item) => item.id === id);

    if (index === -1) {
        return Promise.resolve(false);
    }

    customersDb.splice(index, 1);
    return Promise.resolve(true);
};

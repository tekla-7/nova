import type {CreateOrder, Order} from "../types/Order.ts";
import {apiClient} from "../utils/apiClient.ts";

export const addOrder = async (order: CreateOrder): Promise<{
    ok: boolean;
    status: number;
    data: { id: string | null, message: string };
}> => {

    const response = await apiClient(`order`,
        {
            method: 'POST',
            body: JSON.stringify(order),
        },
    );

    return await response.json();
}

export async function fetchOrder(orderId: string): Promise<Order> {

    const response = await apiClient(`order/${orderId}`);

    return await response.json()
}

export async function fetchOrders(): Promise<Order[]> {
    const response = await apiClient(`order/me`,
        {
            method: 'GET',

        },
    );
    const orders=await response.json()
    return orders.orders;
}
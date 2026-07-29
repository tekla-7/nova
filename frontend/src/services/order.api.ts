import type {CreateOrder, Order} from "../types/Order.ts";
import {apiJson} from "../utils/apiClient.ts";
type OrdersResponse = {
    orders: Order[];
};
export const addOrder = async (order: CreateOrder) => {
    return apiJson(`order`,
        {
            method: 'POST',
            body: JSON.stringify(order),
        },
    );

}

export async function fetchOrder(orderId: string): Promise<Order> {

  return await apiJson<Order>(`order/${orderId}`);

}

export async function fetchOrders(): Promise<Order[]> {
    const { orders } = await apiJson<OrdersResponse>('order/me');
    return orders;
}
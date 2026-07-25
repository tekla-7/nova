import {fetchOrders} from "../../../services/order.api.ts";

export async function loader() {

    try {
        const orders = await fetchOrders();
        return {
            orders,
            error: null,
        };

    } catch (error) {
        return {
            orders: null,
            error: {
                message: error instanceof Error
                    ? error.message
                    : "Something went wrong",
            },
        };
    }

}
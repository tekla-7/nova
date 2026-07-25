import type {LoaderFunctionArgs} from "react-router-dom";
import {fetchOrder} from "../../services/order.api.ts";


export async function loader({params}: LoaderFunctionArgs) {
    const id = params.orderId
    if (!id) return null;
    try {
        const order = await fetchOrder(id);
        return {
            order,
            error: null,
        };

    } catch (error) {
        return {
            order: null,
            error: {
                message: error instanceof Error
                    ? error.message
                    : "Something went wrong",
            },
        };
    }


}
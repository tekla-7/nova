import {fetchOrders} from "../../../utils/http.ts";

export async function loader(){
    try {

        return await fetchOrders()
    } catch {
        return {orders: null};
    }
}
import type {LoaderFunctionArgs} from "react-router-dom";
import {fetchOrder} from "../../utils/http.ts";


export async function loader({params}: LoaderFunctionArgs) {
    const id = params.orderId
    if(!id)return null;
    return await fetchOrder(id)

}
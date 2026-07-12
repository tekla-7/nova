import type {LoaderFunctionArgs} from "react-router-dom";
import type {Product} from "../../types/product.ts";

export async function loader({params}: LoaderFunctionArgs) : Promise<Product> {
    const id = params.productId;
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    const json = await response.json();
    if (!response.ok) {
        throw json({json}, {status: 404});
    } else {
        return json
    }
}
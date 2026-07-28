import type {LoaderFunctionArgs} from "react-router-dom";
import type {Product} from "../../types/product.ts";
import {fetchProduct} from "../../services/product.api.ts";

export async function loader({params}: LoaderFunctionArgs): Promise<{
    product: Product | null;
    error: { message: string } | null;
}> {
    const id = params.productId;
    if (!id) return {
        product: null,
        error: {
            message: "Something went wrong",
        },
    };
    try {
        const json = await fetchProduct(id);

        return {
            product: json,
            error: null,
        };

    } catch (error) {
        return {
            product: null,
            error: {
                message: error instanceof Error
                    ? error.message
                    : "Something went wrong",
            },
        };
    }
}

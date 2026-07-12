import type {Wishlist} from "../types/user.ts";
import {PRODUCT_COLORS, PRODUCT_SIZE} from "../constants/colors.ts";
import {addToCart} from "../utils/http.ts";
import {queryClient} from "../routes/router.tsx";
import {useMutation} from "@tanstack/react-query";

export const useCartMutation = () => {
    const mutation = useMutation({
        mutationFn: addToCart,
        onSuccess: (() => {
            queryClient.invalidateQueries({
                queryKey: ['userCartData'],
                refetchType: "all"
            },).then(() => console.log("invalidation completed"))
        })
    })
    const addToCartHandler = (products: Wishlist[]) => {


        const newProducts = products.map(product => ({
            product: {
                productId: product.productId,
                title: product.title,
                price: product.price,
                brand: product.brand || "-",
                image: product.image,
            },
            quantity: 1,
            size: PRODUCT_SIZE[0],
            color: PRODUCT_COLORS[0].value,
        }));

        mutation.mutate(newProducts);
    };
    return {...mutation, addToCartHandler};
}
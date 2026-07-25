import type {Wishlist} from "../types/user.ts";
import {PRODUCT_COLORS, PRODUCT_SIZE} from "../constants/colors.ts";
import {queryClient} from "../routes/router.tsx";
import {useMutation} from "@tanstack/react-query";
import {addToCart} from "../services/cart.api.ts";
import {useDispatch} from "react-redux";
import {uiAction as notificationAction} from "../store/ui-slice.tsx";

export const useCartMutation = () => {
    const dispatch=useDispatch();
    const mutation = useMutation({
        mutationFn: addToCart,
        onSuccess: async () => {
            await  queryClient.invalidateQueries({
                queryKey: ["userCartData"],
                refetchType: "all",
            });
            dispatch(notificationAction.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Product add successfully',
            }))
        },

        onError: (error) => {
            dispatch(notificationAction.showNotification({
                status: 'error',
                title: 'Error',
                message: error?.message||'An error occurred',
            }))
        },
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
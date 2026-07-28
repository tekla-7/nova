import type {Wishlist} from "../../types/user.ts";
import {PRODUCT_COLORS, PRODUCT_SIZE} from "../../constants/colors.ts";
import {queryClient} from "../../routes/router.tsx";
import {useMutation} from "@tanstack/react-query";
import {addToCart} from "../../services/cart.api.ts";
import {useDispatch} from "react-redux";
import {QUERY_KEYS} from "../../constants/queryKeys.ts";
import type {AppDispatch} from "../../store";
import {showError, showSuccess} from "../../utils/notification.ts";
import type {Cart} from "../../types/cart.ts";

export const useCartMutation = () => {
    const dispatch=useDispatch<AppDispatch>();
    const mutation = useMutation({
        mutationFn: addToCart,
        onSuccess: async () => {
            await  queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.CART,
                refetchType: "all",
            });
            showSuccess(dispatch,'Product added successfully')

        },

        onError: (error) => {
            showError(dispatch, error.message);

        },
    })
    const addWishlistToCartHandler = (products: Wishlist[]) => {
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
    const addProductToCart=(cart: Cart[]) => {
        mutation.mutate(cart);

    }
    return {...mutation, addWishlistToCartHandler,addProductToCart};
}
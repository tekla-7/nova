import {queryClient} from "../../routes/router.tsx";
import {QUERY_KEYS} from "../../constants/queryKeys.ts";
import {showError, showSuccess} from "../../utils/notification.ts";
import {useMutation} from "@tanstack/react-query";
import {addToWishlist} from "../../services/wishlist.api.ts";
import type {CartItem} from "../../types/user.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store";
import type {Product} from "../../types/product.ts";

export const useAddWishlistMutation = () => {
    const dispatch = useDispatch<AppDispatch>();
    const mutation = useMutation({
        mutationFn: addToWishlist,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: QUERY_KEYS.WISHLIST}).then(() => console.log("invalidation completed"))
            showSuccess(dispatch, 'Added successfully')
        },
        onError(err) {
            showError(dispatch, err.message)
        }
    })
    const addCartToWishlistHelper = (cart: CartItem): void => {
        mutation.mutate({
            productId: cart.product.productId,
            title: cart.product.title,
            price: cart.product.price,
            brand: cart.product.brand,
            image: cart.product.image,
        })
    }
    const addProductToWishlist = (product: Product): void => {
        mutation.mutate({
            productId: product.id,
            title: product.title,
            price: product.price,
            brand: product.brand || '-',
            image: product.images[0],
        })
    }


    return {...mutation, addCartToWishlistHelper ,addProductToWishlist}
}
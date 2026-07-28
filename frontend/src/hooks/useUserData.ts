import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "../services/user.api.ts";
import {fetchUserCart} from "../services/cart.api.ts";
import {fetchUserWishlist} from "../services/wishlist.api.ts";
import {CACHE_TIME, QUERY_KEYS} from "../constants/queryKeys.ts";

export const useUserData = () => {

    return useQuery({
        queryKey: QUERY_KEYS.USER,
        queryFn: fetchUser,
        staleTime: CACHE_TIME.ONE_HOUR,

    })
}
export const useUserCartData = () => {

    return useQuery({
        queryKey: QUERY_KEYS.CART,
        queryFn:fetchUserCart,
        staleTime: CACHE_TIME.ONE_HOUR,

        // refetchOnWindowFocus: false,
    })
}
export const useUserWishlist = () => {

    return useQuery({
        queryKey: QUERY_KEYS.WISHLIST,
        queryFn: fetchUserWishlist,
        staleTime: CACHE_TIME.ONE_HOUR,
    })
}
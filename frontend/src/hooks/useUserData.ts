import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "../services/user.api.ts";
import {fetchUserCart} from "../services/cart.api.ts";
import {fetchUserWishlist} from "../services/wishlist.api.ts";
import {CACHE_TIME, QUERY_KEYS} from "../constants/queryKeys.ts";
import {isAuthenticated} from "../utils/auth.ts";

export const useUserData = () => {
    const authenticated = isAuthenticated();

    return useQuery({
        queryKey: QUERY_KEYS.USER,
        queryFn: fetchUser,
        enabled: authenticated,

        staleTime: CACHE_TIME.ONE_HOUR,

    })
}
export const useUserCartData = () => {
    const authenticated = isAuthenticated();

    return useQuery({
        queryKey: QUERY_KEYS.CART,
        queryFn:fetchUserCart,
        enabled: authenticated,

        staleTime: CACHE_TIME.ONE_HOUR,

        // refetchOnWindowFocus: false,
    })
}
export const useUserWishlist = () => {
    const authenticated = isAuthenticated();

    return useQuery({
        queryKey: QUERY_KEYS.WISHLIST,
        queryFn: fetchUserWishlist,
        enabled: authenticated,

        staleTime: CACHE_TIME.ONE_HOUR,
    })
}
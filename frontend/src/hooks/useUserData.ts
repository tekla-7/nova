import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "../services/user.api.ts";
import {isAuthenticated} from "../utils/auth.ts";
import {fetchUserCart} from "../services/cart.api.ts";
import {fetchUserWishlist} from "../services/wishlist.api.ts";

export const useUserData = () => {
    const authenticated = isAuthenticated();

    return useQuery({
        queryKey: ['userData'],
        queryFn: fetchUser,
        staleTime: 3600000,
        retry: false,
        enabled: authenticated,
        refetchOnWindowFocus: false,

    })
}
export const useUserCartData = () => {
    return useQuery({
        queryKey: ['userCartData'],
        queryFn:fetchUserCart,
        staleTime: 3600000,
        // refetchOnWindowFocus: false,
    })
}
export const useUserWishlist = () => {
    return useQuery({
        queryKey: ['userWishlist'],
        queryFn: fetchUserWishlist,
        staleTime: 3600000,
    })
}
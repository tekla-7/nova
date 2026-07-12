import {useQuery} from "@tanstack/react-query";
import {fetchUser, fetchUserCart, fetchUserWishlist} from "../utils/http.ts";

export const useUserData = () => {
    return useQuery({
        queryKey: ['userData'],
        queryFn: fetchUser,
        staleTime: 3600000,
        retry: 2,
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
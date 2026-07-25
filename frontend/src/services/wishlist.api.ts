import type {Wishlist} from "../types/user.ts";
import {apiClient} from "../utils/apiClient.ts";
export async function addToWishlist(item: Wishlist) {

    const response = await apiClient("users/me/wishlist", {
        method: "POST",
        body: JSON.stringify(item),
    });

   return await response.json()
}

export async function fetchUserWishlist(): Promise<Wishlist[]> {
    const response = await apiClient(`users/me/wishlist`)
    return await response.json()
}

export async function removeProductFromWishlist(id: number) {

    const response = await apiClient(`users/me/wishlist/${id}`, {
        method: "DELETE",
    })
    return await response.json()
}

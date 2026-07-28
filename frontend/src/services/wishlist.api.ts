import type {Wishlist} from "../types/user.ts";
import {apiJson} from "../utils/apiClient.ts";
import {isAuthenticated} from "../utils/auth.ts";
export async function addToWishlist(item: Wishlist) {

   return apiJson("users/me/wishlist", {
        method: "POST",
        body: JSON.stringify(item),
    });


}

export async function fetchUserWishlist(): Promise<Wishlist[]> {
    if (!isAuthenticated()) {
        return [];
    }
    return  apiJson(`users/me/wishlist`)
}

export async function removeProductFromWishlist(id: number) {

  return  apiJson(`users/me/wishlist/${id}`, {
        method: "DELETE",
    })
}

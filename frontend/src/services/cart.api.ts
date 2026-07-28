import type {Cart} from "../types/cart.ts";

import type {CartItem} from "../types/user.ts";
import {apiJson} from "../utils/apiClient.ts";
import {isAuthenticated} from "../utils/auth.ts";

export async function addToCart(cartItem: Cart[]) {

    return apiJson(`users/me/cart`,
        {
            method: 'POST',
            body: JSON.stringify(cartItem),
        },
    );

}

export async function fetchUserCart(): Promise<CartItem[]> {
    if (!isAuthenticated()) {
        return [];
    }

    return await apiJson(`users/me/cart`);

}

export async function deleteCartItem(id: string) {

    return apiJson(`users/me/cart/${id}`, {
        method: "DELETE",
    })


}

export async function ChangeCartQuantity(id: string, quantity: number) {

    return apiJson(`users/me/cart/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            quantity,
        }),
    })
}

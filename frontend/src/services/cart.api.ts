import type {Cart} from "../types/cart.ts";

import type {CartItem} from "../types/user.ts";
import {apiClient} from "../utils/apiClient.ts";

export async function addToCart(cartItem: Cart[]) {

    const response = await apiClient(`users/me/cart`,
        {
            method: 'POST',
            body: JSON.stringify(cartItem),
        },
    );

   return await response.json()
}
export async function fetchUserCart(): Promise<CartItem[]> {
    const response = await apiClient(`users/me/cart`);
    return await response.json()
}

export async function deleteCartItem(id: string) {

    const response = await apiClient(`users/me/cart/${id}`, {
        method: "DELETE",
    })

    return await response.json()

}

export async function ChangeCartQuantity(id: string, quantity: number) {
    const response = await apiClient(`users/me/cart/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            quantity,
        }),
    })
    return await response.json()
}

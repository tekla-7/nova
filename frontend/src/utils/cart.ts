import type {CartItem} from "../types/user.ts";

export function getCartSummary(
    cart: CartItem[],
    shipping = 0
) {
    const itemCount = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const subTotal = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const tax = subTotal * 0.08;

    const total = subTotal + shipping + tax;

    return {
        itemCount,
        subTotal,
        tax,
        shipping,
        total,
    };
}
import ApiError from '../models/error.ts'
import type {Category} from "../types/category.ts";
import type {ProductsResponse} from "../types/product.ts";
import type {Cart} from "../types/cart.ts";
import {PRODUCTS_API_URL, BACKEND_API_URL} from '../config.ts'
import {getAuthToken, isAuthenticated, removeAuthToken} from "./auth.ts";
import type {CartItem, User, Wishlist} from "../types/user.ts";
import {queryClient} from "../routes/router.tsx";
import type {ShoppingMethod} from "../types/checkout.ts";
import type {CreateOrder, Order} from "../types/Order.ts";

async function fetchCategories(): Promise<Category[]> {
    const response = await fetch(`${PRODUCTS_API_URL}/categories`);
    if (!response.ok) {
        throw new ApiError(
            'An error occurred while fetching the categories.',
            response.status,
            await response.json()
        );
    }

    return await response.json();
}

async function fetchProducts(): Promise<ProductsResponse> {
    const response = await fetch(`${PRODUCTS_API_URL}?limit=0`);
    if (!response.ok) {
        throw new ApiError(
            'An error occurred while fetching the products.',
            response.status,
            await response.json()
        );
    }

    return await response.json();
}

async function addToCart(cartItem: Cart[]) {
    // if (!isAuthenticated()) {
    //     const cartFromStorageJS = localStorage.getItem("cart");
    //     if (cartFromStorageJS) {
    //         const cartFromStorage = JSON.parse(cartFromStorageJS) as Cart[];
    //         const index = cartFromStorage.findIndex(el => el.product.productId === cartItem.product.productId);
    //         if (index !== -1) {
    //             cartFromStorage[index].quantity += cartItem.quantity;
    //         } else {
    //             cartFromStorage.push(cartItem);
    //         }
    //         localStorage.setItem("cart", JSON.stringify(cartFromStorage))
    //
    //     } else {
    //         localStorage.setItem("cart", JSON.stringify([cartItem]));
    //     }
    //
    //     return {
    //         ok: true,
    //         status: 200,
    //         data: {message: "add product to cart."},
    //     }
    //
    // }
    const token = getAuthToken()
    const response = await fetch(`${BACKEND_API_URL}users/me/cart`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(cartItem),
        },
    );
    if (!response.ok) {
        return {
            ok: false,
            status: response.status,
            data: {message: "Failed to add product to cart."},
        }

    }
    return {
        ok: true,
        status: 200,
        data: {message: "successfully added to cart."},
    };
}

export async function fetchLogIn(authData: { email: string; password: string }) {

    const res = await fetch(`${BACKEND_API_URL}auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(authData),
    });

    const data = await res.json();
    if (res.status === 422 || res.status === 401) {
        return {
            ok: false,
            status: res.status,
            data,
        };
    }

    if (!res.ok) {
        return {
            ok: false,
            status: 500,
            data: {message: "Could not authenticate user."},
        };
    }
    await Promise.all([
        queryClient.invalidateQueries({queryKey: ['userData']}),
        queryClient.invalidateQueries({queryKey: ['userCartData']}),
        queryClient.invalidateQueries({queryKey: ['userWishlist']})
    ]);
    return {
        ok: true,
        data,
    };
}

export async function fetchSignUp(signUpData: { email: string; password: string }) {

    const res = await fetch(`${BACKEND_API_URL}auth/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(signUpData),
    });

    const data = await res.json();
    if (res.status === 422 || res.status === 401) {
        return {
            ok: false,
            status: res.status,
            data,
        };
    }

    if (!res.ok) {
        return {
            ok: false,
            status: 500,
            data: {message: "Could not signup user."},
        };
    }

    return {
        ok: true,
        data,
    };
}

export async function fetchUser(): Promise<User | null> {
    if (!isAuthenticated()) return null;

    const token = getAuthToken();
    if (!token) {
        return null;
    }
    const response = await fetch(`${BACKEND_API_URL}users/me`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,

        },
    });
    if (!response.ok) {
        removeAuthToken()
        return null
    }
    return await response.json()
}

export async function fetchShoppingMethods(): Promise<ShoppingMethod[]> {
    if (!isAuthenticated()) return [];
    return [
        {
            id: 1,
            title: 'Standard shipping',
            price: 0,
            description: '3–5 business days'
        },
        {
            id: 2,
            title: 'Express shipping',
            price: 12,
            description: '1–2 business days'
        },
        {
            id: 3,
            title: 'Next day delivery',
            price: 23,
            description: 'Order before 2pm'
        }
    ]
    const token = getAuthToken();
    if (!token) {
        return [];
    }
    const response = await fetch(`${BACKEND_API_URL}shopping-methods`)
    if (!response.ok) {
        return [];
    }
    return await response.json()
}

export async function fetchUserCart(): Promise<CartItem[]> {
    if (!isAuthenticated()) return [];

    const token = getAuthToken();
    if (!token) {
        return [];
    }
    const response = await fetch(`${BACKEND_API_URL}users/me/cart`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,

        },
    });
    if (!response.ok) {
        return []
    }
    return await response.json()
}

export async function deleteCartItem(id: string) {
    if (!isAuthenticated()) return null;

    const token = getAuthToken();
    if (!token) {
        return null;
    }
    const response = await fetch(`${BACKEND_API_URL}users/me/cart/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
    if (!response.ok) {
        return {
            ok: false,
            status: response.status,
            data: {message: "Could not delete cart."},
        }
    }
    return await response.json()

}

export async function ChangeCartQuantity(id: string, quantity: number) {
    if (!isAuthenticated()) return null;
    const token = getAuthToken();
    const response = await fetch(`${BACKEND_API_URL}users/me/cart/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            quantity,
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
    if (!response.ok) {
        return {
            ok: false,
            status: response.status,
            data: {message: "Cannot change quantity."},

        }
    }
    return await response.json()
}

export async function addToWishlist(cart: Wishlist) {
    if (!isAuthenticated()) {
        return

    }
    const token = getAuthToken()
    const response = await fetch(`${BACKEND_API_URL}users/me/wishlist`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(cart),
        },
    );
    if (!response.ok) {
        return {
            ok: false,
            status: response.status,
            data: {message: "Failed to add product to wishlist."},
        }

    }
    return {
        ok: true,
        status: 200,
        data: {message: "successfully added to wishlist."},
    };
}

export async function fetchUserWishlist(): Promise<Wishlist[]> {
    if (!isAuthenticated()) return [];

    const token = getAuthToken();
    if (!token) {
        return [];
    }
    const response = await fetch(`${BACKEND_API_URL}users/me/wishlist`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
    if (!response.ok) {
        return []
    }
    return await response.json()
}

export async function removeProductFromWishlist(id: number) {
    if (!isAuthenticated()) return null;
    const token = getAuthToken();
    if (!token) {
        return null;
    }
    const response = await fetch(`${BACKEND_API_URL}users/me/wishlist/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
    if (!response.ok) {
        return {
            ok: false,
            status: response.status,
            data: {message: "Could not delete product from wishlist."},
        }
    }
    return await response.json()
}

export const fetchCountries = async () => {
    const response = await fetch(`${BACKEND_API_URL}reference-data/countries`)
    if (!response.ok) {
        return []
    }

    return await response.json()
}
export const fetchState = async (code: string) => {
    const response = await fetch(`${BACKEND_API_URL}reference-data/states/${code}`)
    if (!response.ok) {
        return []
    }
    return await response.json()
}
export const fetchCity = async (cCode: string, sCode: string) => {
    const response = await fetch(`${BACKEND_API_URL}reference-data/city/${cCode}/${sCode}`)
    if (!response.ok) {
        return []
    }
    return await response.json()
}
export const addOrder = async (order: CreateOrder): Promise<{
    ok: boolean;
    status: number;
    data: { id: string | null, message: string };
}> => {
    if (!isAuthenticated()) {
        return {
            ok: false,
            status: 401,
            data: {id: null, message: "user is not authenticated."},
        }

    }
    const token = getAuthToken()
    const response = await fetch(`${BACKEND_API_URL}order`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(order),
        },
    );
    if (!response.ok) {
        return {
            ok: false,
            status: response.status,
            data: {id: null, message: "Failed to add product to order."},
        }

    }
    const id = await response.json();

    return {
        ok: true,
        status: response.status,
        data: {id, message: 'add order successfully.'},
    };
}

export async function fetchOrder(orderId: string): Promise<Order> {
    if (!isAuthenticated()) {
        throw new Response("User is not authenticated.", {
            status: 401,
        });

    }
    const token = getAuthToken()
    const response = await fetch(`${BACKEND_API_URL}order/${orderId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        },
    );
    // TODO
    if (!response.ok) {
        throw new Response("Failed to fetch order.", {
            status: response.status,
        });
    }
    return await response.json()
}

export {fetchCategories, fetchProducts, addToCart};
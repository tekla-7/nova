import type {Addresses, Card, NewPasswordReq, NotificationPreferences, UpdateUserInfoReq, User} from "../types/user.ts";
import {apiClient} from "../utils/apiClient.ts";
import {BACKEND_API_URL} from "../config.ts";



export async function fetchUser(): Promise<User | null> {
    const response = await apiClient("users/me");
    return await response.json()
}

export async function updateUserInfo(data: UpdateUserInfoReq) {
    const response = await apiClient("users/me", {
        method: 'PATCH',
        body: JSON.stringify(data),
    },);
    return await response.json();
}

export async function updatePassword(data: NewPasswordReq) {
    const response = await apiClient('users/me/password', {
            method: 'PATCH',
            body: JSON.stringify(data),
        },
    );
    return await response.json()
}

export async function addAddresses(addresses: Addresses) {

    const response = await apiClient(`users/me/addresses`,
        {
            method: 'POST',
            body: JSON.stringify(addresses),
        },
    );
    return await response.json();

}

export async function deleteAddress(id: string) {

    const response = await apiClient(`users/me/addresses/${id}`,
        {
            method: 'DELETE',
        },
    );
    return await response.json();

}

export async function editAddresses({id, addresses,}: { id: string, addresses: Addresses }) {

    const response = await apiClient(`users/me/addresses/${id}`,
        {
            method: 'PATCH',
            body: JSON.stringify(addresses),
        },
    );
    return  await response.json();

}

export async function editNotification(notification: NotificationPreferences) {

    const response = await apiClient(`users/me/notifications`,
        {
            method: 'PATCH',
            body: JSON.stringify(notification),
        },
    );
   return  await response.json();

}

export async function addCard(card: Card) {

    const response = await apiClient(`${BACKEND_API_URL}users/me/card`,
        {
            method: 'POST',
            body: JSON.stringify(card),
        },
    );
    return  await response.json();

}

export async function deleteCard(id: string) {

    const response = await apiClient(`${BACKEND_API_URL}users/me/card/${id}`,
        {
            method: 'DELETE',
        },
    );

    return await response.json()
}
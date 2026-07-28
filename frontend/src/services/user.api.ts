import type {Addresses, Card, NewPasswordReq, NotificationPreferences, UpdateUserInfoReq, User} from "../types/user.ts";
import {apiJson} from "../utils/apiClient.ts";
import {BACKEND_API_URL} from "../config.ts";



export async function fetchUser(): Promise<User | null> {
    return  apiJson<User>("users/me");

}

export async function updateUserInfo(data: UpdateUserInfoReq) {
    return  apiJson("users/me", {
        method: 'PATCH',
        body: JSON.stringify(data),
    },);

}

export async function updatePassword(data: NewPasswordReq) {
   return  apiJson('users/me/password', {
            method: 'PATCH',
            body: JSON.stringify(data),
        },
    );
}

export async function addAddresses(addresses: Addresses) {

    return  apiJson(`users/me/addresses`,
        {
            method: 'POST',
            body: JSON.stringify(addresses),
        },
    );

}

export async function deleteAddress(id: string) {

  return  apiJson(`users/me/addresses/${id}`,
        {
            method: 'DELETE',
        },
    );


}

export async function editAddresses({id, addresses,}: { id: string, addresses: Addresses }) {

    return  apiJson(`users/me/addresses/${id}`,
        {
            method: 'PATCH',
            body: JSON.stringify(addresses),
        },
    );

}

export async function editNotification(notification: NotificationPreferences) {

  return  apiJson(`users/me/notifications`,
        {
            method: 'PATCH',
            body: JSON.stringify(notification),
        },
    );

}

export async function addCard(card: Card) {

    return  apiJson(`${BACKEND_API_URL}users/me/card`,
        {
            method: 'POST',
            body: JSON.stringify(card),
        },
    );

}

export async function deleteCard(id: string) {

   return  apiJson(`${BACKEND_API_URL}users/me/card/${id}`,
        {
            method: 'DELETE',
        },
    );


}
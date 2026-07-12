export interface User {


    "id": string,
    "name": string,
    "lastName": string,
    "email": string,
    "phoneNumber": string,
    "notificationPreferences": {
        "orderUpdates": boolean,
        "promotions": boolean,
        "wishlist": boolean,
        "newsletter": boolean
    },
    "addresses": Addresses[],
    "cart": CartItem[],
    "wishlist": Wishlist[]
    "card": Card[]
}

export interface Addresses {
    id: string,
    isDefault: boolean,
    name: string,
    lastName: string,
    city: { name: string, code: string },
    zipCode: number,
    country: { name: string, code: string },
    streetAddress: string,
    state?: { name: string, code: string },
}

export interface Wishlist {
    productId: number,
    title: string,
    price: number,
    brand: string,
    image: string,
}

export interface CartItem {
    "id": string,
    "product": Wishlist,
    "quantity": number,
    "size": string,
    "color": string

}

export interface Card {
    id:number,
    number: string,
    expiryData: string,
    cvv: number,
    name: string,
    isDefault?: boolean,
}
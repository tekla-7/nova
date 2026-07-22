import type {Addresses, Card, CartItem} from "./user.ts";
import type {ShoppingMethod} from "./checkout.ts";

export interface Order {
    id: string;
    userName:string,
    orderNumber: string;
    paid:number,
    payment:Card,
    paymentMethod:'Card'|'Apple Pay',
    deliveryMethod:ShoppingMethod,
    items:CartItem[],
    createdAt:string,
    address: Addresses,
    email:string,
    phone:string,
    tracking:Tracking
}
export interface Tracking{
    orderConfirm:{date:string[] ,isConfirmed:boolean},
    processing:{date:string[] ,isConfirmed:boolean},
    dispatched:{date:string[] ,isConfirmed:boolean},
    outForDelivery:{date:string[] ,isConfirmed:boolean},
    delivered:{date:string[] ,isConfirmed:boolean},
}
export interface CreateOrder {
    paid:number,
    payment:Card|null,
    email:string,
    phone:string,
    paymentMethod:'Card'|'Apple Pay',
    deliveryMethod:ShoppingMethod,
    items:CartItem[],
    createdAt?:string,
    address: Addresses,
    saveAddress:boolean,
    saveCard:boolean,
}

import type {ShoppingMethod} from "../types/checkout.ts";
import type {Addresses, Card} from "../types/user.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialFiltersState: {
    shoppingStep:{
        email: string;
        phone: string;
        shippingMethod: ShoppingMethod;
        address: Addresses|null;
        addressForm: Addresses|null;
        saveAddress?: boolean;
        addressFormIsActive:boolean
    }|null,
    paymentStep:{
        card:Card|null;
        saveCard?:boolean;
        paymentMethodId: number;
        cardForm: Card|null;
        cardFormIsActive:false;
    }|null
} ={
    shoppingStep:null,
    paymentStep:null
}
const checkoutSlice=createSlice({
    name: 'checkout',
    initialState: initialFiltersState,
    reducers: {
        addFirstStep: (state, action) => {
            return {...state,shoppingStep: action.payload};
        },
        addLastStep: (state, action) => {
            return {...state,paymentStep: action.payload};
        }
    }
})
export default checkoutSlice.reducer;
export const checkoutAction = checkoutSlice.actions;
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
type ToggleKey = "isWishlistOpen" | "isCartOpen" | "isUserOpen";

const initialState: {
    notification:
        | { status: 'error' | 'success' | 'warning' | 'info', title: string, message: string }
        | null,
    isLoading: boolean,
    isWishlistOpen: boolean,
    isCartOpen: boolean,
    isUserOpen: boolean,
} = {
    notification: null,
    isLoading: false,
    isWishlistOpen: false,
    isCartOpen: false,
    isUserOpen: false,

}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        showNotification: (state, action) => {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            }
        },
        clearNotification: (state) => {
            state.notification = null;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        toggle(state,action:PayloadAction<ToggleKey>) {
            const key = action.payload;
            const currentValue = state[key];
            state.isWishlistOpen = false;
            state.isCartOpen = false;
            state.isUserOpen = false;
            state[key] = !currentValue;
        },
        modalClose(state) {
           if(state.isCartOpen) state.isCartOpen = false;
           if(state.isUserOpen) state.isUserOpen = false;
           if(state.isWishlistOpen) state.isWishlistOpen = false;
        }
    }
})
export const uiAction = uiSlice.actions;
export default uiSlice.reducer
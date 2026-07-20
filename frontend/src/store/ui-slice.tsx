import {createSlice} from "@reduxjs/toolkit";

const initialState: {
    notification:
        | { status: 'error' | 'success' | 'warning' | 'info', title: string, message: string }
        | null,
    isLoading: boolean
} = {
    notification: null,
    isLoading: false

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
    }
})
export const notificationAction = uiSlice.actions;
export default uiSlice.reducer
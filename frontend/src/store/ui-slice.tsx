import {createSlice} from "@reduxjs/toolkit";

const initialState: { notification: { status: string, title: string, message: string } | null } = {
    notification: null
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
        }
    }
})
export const notificationAction = uiSlice.actions;
export default uiSlice.reducer
import {configureStore} from "@reduxjs/toolkit";
import filterReducer from "./filter-slice.tsx";
import uiReducer from './ui-slice.tsx'
import checkoutReducer from './checkout-slice.tsx'

const store = configureStore({
    reducer: {
        filter: filterReducer,
        ui: uiReducer,
        checkout: checkoutReducer
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
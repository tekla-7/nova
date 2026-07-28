import type {AppDispatch} from "../store";

import {uiAction as notificationAction} from "../store/ui-slice.tsx";

export const showSuccess = (
    dispatch: AppDispatch,
    message: string
) => {
    dispatch(
        notificationAction.showNotification({
            status: "success",
            title: "Success",
            message,
        })
    );
};

export const showError = (
    dispatch: AppDispatch,
    message: string
) => {
    dispatch(
        notificationAction.showNotification({
            status: "error",
            title: "Error",
            message,
        })
    );
};
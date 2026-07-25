import {useMutation} from "@tanstack/react-query";
import type {CreateOrder,} from "../types/Order.ts";
import {} from "../utils/http.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addOrder} from "../services/order.api.ts";
import {uiAction as notificationAction} from "../store/ui-slice.tsx";

type Resp = {
    ok: boolean;
    status: number;
    data: { id: string | null, message: string };
};
export const useOrderMutation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: addOrder,
        onSuccess: async (response: Resp) => {
            await navigate(`/order/${response.data?.id}`, {state: 'success'});
            dispatch(notificationAction.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Order add successfully',
            }))
        },
        onError: (error) => {
            dispatch(notificationAction.showNotification({
                status: 'error',
                title: 'Error',
                message: error?.message??'An error occurred',
            }))
        }

    })
    const createOrderHandler = (order: CreateOrder) => {
        const newOrder = {
            ...order,
            createdAt: new Date().toString(),
        }
        mutation.mutate(newOrder);

    }
    return {...mutation, createOrderHandler};
}

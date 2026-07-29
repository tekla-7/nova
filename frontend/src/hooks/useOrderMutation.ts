import {useMutation} from "@tanstack/react-query";
import type {CreateOrder,} from "../types/Order.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addOrder} from "../services/order.api.ts";
import {showError, showSuccess} from "../utils/notification.ts";
import {checkoutAction} from "../store/checkout-slice.tsx";


export const useOrderMutation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: addOrder,
        onSuccess: async (response) => {
            if (!response) {
                await navigate(`/profile/orders`, {state: 'success'});
                return showSuccess(dispatch, 'Order added successfully')
            }
            await navigate(`/order/${response}`, {state: 'success'});
            showSuccess(dispatch, 'Order added successfully')
            dispatch(checkoutAction.reset())
        },
        onError: (error) => {
            showError(dispatch, error.message);

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

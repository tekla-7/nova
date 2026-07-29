import {useMutation} from "@tanstack/react-query";
import type {CreateOrder,} from "../types/Order.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addOrder} from "../services/order.api.ts";
import {showError, showSuccess} from "../utils/notification.ts";

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
            if (!response.data?.id) {
                await navigate(`/profile/orders`, {state: 'success'});
                return showSuccess(dispatch, 'Order added successfully')
            }
            await navigate(`/order/${response.data?.id}`, {state: 'success'});
            showSuccess(dispatch, 'Order added successfully')

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

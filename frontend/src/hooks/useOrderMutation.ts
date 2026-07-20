import {useMutation} from "@tanstack/react-query";
import type {CreateOrder,} from "../types/Order.ts";
import {addOrder} from "../utils/http.ts";
import {useNavigate} from "react-router-dom";

type Resp = {
    ok: boolean;
    status: number;
    data: { id: string | null, message: string };
};
export const useOrderMutation = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: addOrder,
        onSuccess: (response: Resp) => {
            console.log(response);
            // TODO clear bag
            navigate(`/order/${response.data?.id}` , {state:'success'});
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

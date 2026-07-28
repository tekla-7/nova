import {useMutation} from "@tanstack/react-query";
import {ChangeCartQuantity} from "../../services/cart.api.ts";
import {queryClient} from "../../routes/router.tsx";
import {QUERY_KEYS} from "../../constants/queryKeys.ts";
import type {CartItem} from "../../types/user.ts";
import {showError, showSuccess} from "../../utils/notification.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store";
type Props = {
    id: string, quantity: number,
}
export const useUpdateCartQuantity = (data:CartItem[]) => {
    const dispatch=useDispatch<AppDispatch>();
    const mutation = useMutation({
        mutationFn: ({id, quantity}: Props) => ChangeCartQuantity(id, quantity),
        onMutate: async ({id, quantity}: Props) => {
            const cartIndex = data.findIndex(cart => cart.id === id);
            await queryClient.cancelQueries({queryKey: QUERY_KEYS.CART})
            const prev = queryClient.getQueriesData({queryKey: QUERY_KEYS.CART});
            const newData={...data}
            if (newData[cartIndex]) newData[cartIndex].quantity = quantity
            queryClient.setQueriesData({queryKey: QUERY_KEYS.CART}, newData)
            return {prev}

        },
        onError: ({context}: { context: { prev: CartItem[] } }) => {
            showError(dispatch, 'Cannot change quantity')
            queryClient.setQueriesData({queryKey: QUERY_KEYS.CART}, context.prev)
        },
        onSuccess: (() => {
            showSuccess(dispatch, 'Add successfully')
        }),
        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: QUERY_KEYS.CART});
        }

    })
    const updateCartQuantityHelper = (id: string, quantity: number): void => {
        mutation.mutate({id, quantity})

    }
    return {...mutation ,updateCartQuantityHelper}
}
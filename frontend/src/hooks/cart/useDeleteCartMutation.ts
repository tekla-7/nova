import {showError, showSuccess} from "../../utils/notification.ts";
import {queryClient} from "../../routes/router.tsx";
import {QUERY_KEYS} from "../../constants/queryKeys.ts";
import {useMutation} from "@tanstack/react-query";
import {deleteCartItem} from "../../services/cart.api.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store";

export const useDeleteCartMutation = () => {
    const dispatch=useDispatch<AppDispatch>();
    const mutation = useMutation({
        mutationFn: deleteCartItem,
        onSuccess: () => {
            showSuccess(dispatch ,'Product removed successfully')
            queryClient.invalidateQueries({queryKey: QUERY_KEYS.CART})
                .then(() => console.log("invalidation completed"))
                .catch(err => console.log("invalidation error:", err));
        },
        onError: (err) => {
            showError(dispatch,err.message)

        },


    });
    const deleteCartHandler = (id:string) =>{
        return mutation.mutate(id)
    }
    return {...mutation, deleteCartHandler};

}
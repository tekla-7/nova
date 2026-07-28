import {useDispatch} from "react-redux";
import {useMutation} from "@tanstack/react-query";
import {removeProductFromWishlist} from "../../services/wishlist.api.ts";
import {queryClient} from "../../routes/router.tsx";
import {QUERY_KEYS} from "../../constants/queryKeys.ts";
import {showError, showSuccess} from "../../utils/notification.ts";

export const useRemoveWishlistMutation = () => {
    const dispatch = useDispatch()
    const mutation = useMutation({
        mutationFn: removeProductFromWishlist,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.WISHLIST,
                refetchType: "all",
            }).then(() => console.log('Invalidation complete'));
            showSuccess(dispatch, 'Product removed successfully')
        },
        onError(err) {
            showError(dispatch, err.message)
        }
    })

    function removeFromWishlistHelper(id: number) {
        mutation.mutate(id)
    }
    return {...mutation,removeFromWishlistHelper};
}
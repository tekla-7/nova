import {queryClient} from "../routes/router.tsx";
import {removeAuthToken} from "../utils/auth.ts";
import {QUERY_KEYS} from "../constants/queryKeys.ts";

export async function signOut() {
    removeAuthToken();

    queryClient.setQueryData(QUERY_KEYS.USER, null);
    queryClient.setQueryData(QUERY_KEYS.CART, []);
    queryClient.setQueryData(QUERY_KEYS.WISHLIST, []);

    queryClient.removeQueries({ queryKey: QUERY_KEYS.USER });
    queryClient.removeQueries({ queryKey: QUERY_KEYS.CART });
    queryClient.removeQueries({ queryKey: QUERY_KEYS.WISHLIST });
}

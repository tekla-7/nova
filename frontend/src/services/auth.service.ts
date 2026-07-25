import {queryClient} from "../routes/router.tsx";
import {removeAuthToken} from "../utils/auth.ts";

export async function signOut() {
    removeAuthToken();
    await queryClient.invalidateQueries({
        queryKey: ["userCartData"],
        refetchType: "all",
    });

    await queryClient.invalidateQueries({
        queryKey: ["userWishlist"],
        refetchType: "all",
    });
    await queryClient.invalidateQueries({
        queryKey: ["userData"],
        refetchType: "all",
    });

}
import {queryClient} from "../routes/router.tsx";
import {apiClient} from "../utils/apiClient.ts";
export async function fetchLogIn(authData: { email: string; password: string }) {
    const res = await apiClient("auth/login", {
        method: "POST",
        body: JSON.stringify(authData),
    });
    const data = await res.json();
    await Promise.all([
        queryClient.invalidateQueries({queryKey: ['userData']}),
        queryClient.invalidateQueries({queryKey: ['userCartData']}),
        queryClient.invalidateQueries({queryKey: ['userWishlist']})
    ]);
    return data
}
export async function fetchSignUp(signUpData: { email: string; password: string }) {

    const res = await apiClient('auth/signup', {
        method: "POST",
        body: JSON.stringify(signUpData),
    });

    return await res.json()
}

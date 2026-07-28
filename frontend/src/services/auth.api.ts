import {queryClient} from "../routes/router.tsx";
import {apiClient, apiJson} from "../utils/apiClient.ts";
import {signOut} from "./auth.service.ts";

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

export async function fetchSignUp(signUpData: { email: string; password: string }):Promise<{token:string}> {
    return apiJson('auth/signup', {
        method: "POST",
        body: JSON.stringify(signUpData),
    })

}
export async function signOutFn() {
    try {
        await apiJson(`auth/logout`, {
            method: "POST",
        });
    } catch (error) {
        console.error("Logout request failed:", error);
    } finally {
        await signOut();
    }



}
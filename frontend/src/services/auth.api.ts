import {queryClient} from "../routes/router.tsx";
import {apiClient, apiJson} from "../utils/apiClient.ts";
import {signOut} from "./auth.service.ts";
import {BACKEND_API_URL} from "../config.ts";
import type {Registration, ResetPasswordReq} from "../types/auth.ts";

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

export async function fetchSignUp(signUpData: Registration): Promise<{ token: string }> {
    return apiJson('auth/signup', {
        method: "POST",
        body: JSON.stringify(signUpData),
    })

}

export async function signOutFn() {
    void signOut();

    try {
        await fetch(`${BACKEND_API_URL}auth/logout`, {
            method: "POST",
            credentials: "include",
        });
    } catch (error) {
        console.error("Logout request failed:", error);
    }


}
export async function resetPassword(reset:ResetPasswordReq){
    return apiJson('auth/resetPassword', {
        method:'POST',
        body: JSON.stringify(reset),
    })
}
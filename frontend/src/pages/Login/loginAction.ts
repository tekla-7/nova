import {type ActionFunctionArgs, redirect} from "react-router-dom";
import {fetchLogIn} from "../../services/auth.api.ts";
import ApiError from "../../models/error.ts";

export async function action({request}:ActionFunctionArgs) {
    const form = await request.formData();
    const authData = {
        email: String(form.get("email") || ""),
        password: String(form.get("password") || ""),
    };
    try {
        const data = await fetchLogIn(authData);
        localStorage.setItem("access_token", data.token);
        return redirect("/");
    } catch (error) {
        if (error instanceof ApiError) {
            return {
                message: error.message,
                status: error.code,
            };
        }

        throw error;
    }
}
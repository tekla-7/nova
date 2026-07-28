import {type ActionFunctionArgs, redirect} from "react-router-dom";
import {fetchSignUp} from "../../services/auth.api.ts";
import ApiError from "../../models/error.ts";

export default async function action({request}: ActionFunctionArgs) {
    const form = await request.formData();
    const password = String(form.get("password") || "")
    const confirmPassword = String(form.get("confirmPassword") || "")
    if (password !== confirmPassword) {
        return {
            errors: {
                confirmPassword: "Passwords do not match",
            },
        };
    }
    const cleanPhone = String(form.get("phoneNumber")).replace(/\D/g, "");

    const registerData = {
        email: String(form.get("email") || ""),
        name: String(form.get("name") || ""),
        lastName: String(form.get("lastName") || ""),
        phoneNumber: '+'+cleanPhone,
        password: String(form.get("password") || ""),
    };
    try {
        const result = await fetchSignUp(registerData);
        localStorage.setItem('access_token',result.token);
        return redirect("/");
    } catch (error) {
        if (error instanceof ApiError) {
            return {
                message: error.message,
                status: error.code,
                errors: error.errors,
            };
        }

        throw error;
    }

}
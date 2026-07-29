import {type ActionFunctionArgs, redirect} from "react-router-dom";
import { resetPassword} from "../../services/auth.api.ts";
import ApiError from "../../models/error.ts";
import type {ResetPasswordReq} from "../../types/auth.ts";

export async function action({request}: ActionFunctionArgs) {
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
    const reset: ResetPasswordReq = {
        password: password,
        email: String(form.get("email") || ""),
        recoveryPhrase: String(form.get("recoveryPhrase") || ""),
    }
    try {
        await resetPassword(reset);
        return redirect("/authentication");
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
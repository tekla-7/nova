import {type ActionFunctionArgs, redirect} from "react-router-dom";
import { fetchSignUp} from "../../utils/http.ts";

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
    const registerData = {
        email: String(form.get("email") || ""),
        name: String(form.get("name") || ""),
        lastName: String(form.get("lastName") || ""),
        phoneNumber: String(form.get("phoneNumber") || ""),
        password: String(form.get("password") || ""),
    };
    const result = await fetchSignUp(registerData);
    if (!result.ok) {
        return result.data;
    }
    localStorage.setItem('access_token',result.data.token);

    return redirect('/')

}
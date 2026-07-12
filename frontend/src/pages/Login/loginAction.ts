import {type ActionFunctionArgs, redirect} from "react-router-dom";
import {fetchLogIn} from "../../utils/http.ts";

export async function action({request}:ActionFunctionArgs) {
    const form = await request.formData();
    const authData = {
        email: String(form.get("email") || ""),
        password: String(form.get("password") || ""),
    };

    const result = await fetchLogIn(authData);

    if (!result.ok) {
        return result.data;
    }
    localStorage.setItem('access_token',result.data.token);

    return redirect('/')
    //
}
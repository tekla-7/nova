import {Navigate} from "react-router-dom";
import {isAuthenticated} from "../utils/auth.ts";

export default function RootRedirect() {
    return isAuthenticated() ? (
        <Navigate to="/home" />
    ) : (
        <Navigate to="/login" />
    )
}
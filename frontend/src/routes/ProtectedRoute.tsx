import {Navigate} from "react-router-dom";
import type {ReactNode} from "react";
import {isAuthenticated} from "../utils/auth.ts";

export default function ProtectedRoute({children}: { children:ReactNode }) {
    return isAuthenticated()? children:<Navigate to="/authentication"/>
}



import {Navigate} from "react-router-dom";
import type {ReactNode} from "react";
import {isAuthenticated} from "../utils/auth.ts";

export default function PublicRoute({children}: { children: ReactNode }) {
    console.log(isAuthenticated())
    return !isAuthenticated()?children:<Navigate to="/"/>
}
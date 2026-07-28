import {Navigate} from "react-router-dom";
import type {ReactNode} from "react";
import {useUserData} from "../hooks/useUserData.ts";

export default function ProtectedRoute({children}: { children:ReactNode }) {
    const { data: user, isSuccess } = useUserData();
    return isSuccess && user ? children : <Navigate to="/authentication" />;}



import {BACKEND_API_URL} from "../config.ts";
import {getAuthToken} from "./auth.ts";
import ApiError from "../models/error.ts";
import {signOut} from "../services/auth.service.ts";

type ApiOptions = RequestInit;

export async function apiClient(
    endpoint: string,
    options: ApiOptions = {},
    api?: string
) {
    const token = getAuthToken();
    const newApi = api ? api : BACKEND_API_URL;
    const response = await fetch(`${newApi}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
            ...options.headers,
        },
    });
    if (!response.ok) {
        if (response.status === 401) {
            await signOut();
        }
        const error = await response.json().catch(() => null);

        throw new ApiError(
            error?.message ?? "Request failed",
            response.status,
            error,
            error?.errors
        );
    }
    return response


}
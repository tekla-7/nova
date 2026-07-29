import {BACKEND_API_URL} from "../config.ts";
import {getAuthToken, setAuthToken} from "./auth.ts";
import ApiError from "../models/error.ts";
import {signOutFn} from "../services/auth.api.ts";

type ApiOptions = RequestInit & {
    baseUrl?: string;
};
let refreshPromise: Promise<string | null> | null = null;

export async function apiClient(
    endpoint: string,
    options: ApiOptions = {},
    isRetry = false
) {
    const {
        baseUrl = BACKEND_API_URL,
        ...fetchOptions
    } = options;

    const token = getAuthToken();
    const response = await fetch(`${baseUrl}${endpoint}`, {
        ...fetchOptions,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
            ...fetchOptions.headers,
        },
    });
    if (
        response.status === 401 &&
        !isRetry &&
        !endpoint.includes("login") &&
        !endpoint.includes("signup") &&
        !endpoint.includes("refresh")&&!endpoint.includes("logout")
    ) {
        const newToken = await refreshAccessToken();

        if (newToken) {
            return apiClient(endpoint, options, true);
        }

        await signOutFn();
    }
    if (!response.ok) {
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

export async function apiJson<T>(
    endpoint: string,
    options?: ApiOptions
): Promise<T> {
    const response = await apiClient(endpoint, options);

    return response.json();
}

async function refreshAccessToken(): Promise<string | null> {
    if (!refreshPromise) {
        refreshPromise = (async () => {
            try {
                const res = await fetch(`${BACKEND_API_URL}auth/refresh`, {
                    method: "POST",
                    credentials: "include",
                });

                if (!res.ok) {
                    return null;
                }

                const data = await res.json();
                setAuthToken(data.token);
                return data.token;
            } catch (error) {
                console.error(error)
                return null;
            } finally {
                refreshPromise = null;
            }
        })();
    }
    return refreshPromise;
}
import {jwtDecode} from "jwt-decode";

export const isAuthenticated = () => {
    // TODO

    const token = getAuthToken();
    // const expiresAt = localStorage.getItem("expires_at");


    if (!token ) {
        return false;
    }
    const decoded = jwtDecode(token);
    if (Date.now() > Number(decoded.exp)* 1000) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_at");
        return false;
    }

    return true;
};

export function getAuthToken() {
    return localStorage.getItem("access_token");
}
export function setAuthToken(token: string) {
    localStorage.setItem("access_token", token);
}
export function removeAuthToken() {
    localStorage.removeItem("access_token");

}
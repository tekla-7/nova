
import {compare} from "bcryptjs";


export function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);

}
export function isValidText(value, minLength = 1) {
    return value && value.trim().length >= minLength;
}

export function isValidPassword(password, storedPassword) {
    return compare(password, storedPassword)
}
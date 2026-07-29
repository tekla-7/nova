import {isValidEmail, isValidPassword, isValidRecoveryPhrase, isValidText} from "../utils/validation.js";
import {addUser, getUser} from "../data/users.js";
import {isValidPhoneNumber} from "libphonenumber-js";
import {createJSONToken, createRefreshToken, validateJSONRefreshToken, validateJSONToken} from "../utils/auth.js";
import {
    deleteRefreshToken,
    findRefreshToken,
    resetPasswordByRecoveryPhrase,
    saveRefreshToken
} from "../data/refreshToken.js";

const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/api/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};
export const REFRESH_TOKEN = 'refreshToken';
///@desc create new user
///@route POST /api/auth/singup
export const signup = async (req, res, next) => {
    const data = req.body;
    let errors = {};
    if (!isValidEmail(data.email)) {
        errors.email = 'Invalid email.';
    } else {
        try {
            const existingUser = await getUser(data.email);
            if (existingUser) {
                errors.email = 'Email exists already.';
            }

        } catch (error) {

        }
    }
    if (!isValidText(data.password, 6)) {
        errors.password = 'Invalid password.';
    }
    if (!isValidText(data.name, 1)) {
        errors.name = 'Invalid name.';
    }
    if (!isValidText(data.lastName, 1)) {
        errors.lastName = 'Invalid last name.';
    }
    if (!isValidPhoneNumber(data.phoneNumber, "GE")) {
        errors.phoneNumber = 'Invalid phone.';
    }
    if (Object.keys(errors).length > 0) {
        return res.status(422).json({
            message: 'User signup failed due to validation errors.',
            errors,
        });
    }
    let newUser;
    try {
        const {password, ...safeUser} = await addUser(data);
        newUser = safeUser;
    } catch (error) {
        const err = new Error('User creation failed');
        err.status = 400;
        return next(err);
    }
    const token = createJSONToken(newUser.id);
    const newRefreshToken = createRefreshToken(newUser.id);

    try {
        await saveRefreshToken(newUser.id, newRefreshToken);
    } catch (error) {
        error.status = 500;
        error.message = "Could not save refresh token";
        return next(error);
    }
    res.cookie(REFRESH_TOKEN, newRefreshToken, REFRESH_COOKIE_OPTIONS);

    return res.status(201).json({
        message: 'User created.',
        user: newUser,
        token,
    });
}
///@desc log in  user
///@route POST /api/auth/login
export const login = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email) {
        const error = new Error('Email is required.');
        error.status = 400;
        return next(error);
    }
    if (!password) {
        const error = new Error('Password is required.');
        error.status = 400;
        return next(error);
    }
    if (!isValidEmail(email)) {
        const error = new Error('Invalid email format.');
        error.status = 400;
        return next(error);
    }
    let existingUser
    try {
        existingUser = await getUser(email);

    } catch (error) {
        error.status = 401;
        error.message = "Invalid email or password.";
        return next(error);
    }

    const pwIsValid = await isValidPassword(password, existingUser.password);
    if (!pwIsValid) {
        const error = new Error('Invalid email or password.');
        error.status = 401;
        return next(error);

    }

    const token = createJSONToken(existingUser.id);
    const newRefreshToken = createRefreshToken(existingUser.id);
    try {
        await saveRefreshToken(existingUser.id, newRefreshToken);
    } catch (error) {
        error.status = 500;
        error.message = "Could not save refresh token";
        return next(error);
    }
    res.cookie(REFRESH_TOKEN, newRefreshToken, REFRESH_COOKIE_OPTIONS);

    const {password: oldPassword, ...safeUser} = existingUser;
    return res.status(200).json({
        message: "Login successful.",
        token,
        user: safeUser,
    });
}

///@desc get  user refresh token
///@route POST /api/auth/refresh
export const refresh = async (req, res, next) => {
    const refreshToken = req.cookies[REFRESH_TOKEN];
    if (!refreshToken) {
        const error = new Error('Refresh token not found.User is unauthorized');
        error.status = 401;
        return next(error);
    }
    try {
        const {id} = validateJSONRefreshToken(refreshToken);
        const storedToken = await findRefreshToken(refreshToken)
        if (!storedToken) {
            const error = new Error('Refresh token has been revoked.');
            error.status = 401;
            return next(error);
        }

        const newAccessToken = createJSONToken(id);
        return res.status(200).json({
            message: "New access token generated",
            token: newAccessToken,
        });
    } catch (err) {
        res.clearCookie(REFRESH_TOKEN, {path: '/api/auth'});
        const error = new Error('Invalid or expired refresh token.');
        error.status = 401;
        return next(error);
    }
}
///@desc log out user (clears refresh token )
///@route POST /api/auth/logout
export const logout = async (req, res, next) => {
    const refreshToken = req.cookies[REFRESH_TOKEN];

    if (refreshToken) {
        try {
            await deleteRefreshToken(refreshToken);
        } catch (error) {
        }
    }

    res.clearCookie(REFRESH_TOKEN, {path: '/api/auth'});
    return res.status(200).json({message: "Logged out successfully."});
};
///@desc reset password
///@route POST /api/auth/resetPassword
export const resetPassword = async (req, res, next) => {
    const {email, password, recoveryPhrase} = req.body;
    if (!email || !password || !recoveryPhrase) {
        const error = new Error('Please entered all required information.');
        error.status = 400;
        return next(error);
    }
    if (!isValidEmail(email)) {
        const error = new Error('Invalid email format.');
        error.status = 400;
        return next(error);
    }
    let existingUser = null
    try {
        existingUser = await getUser(email);

    } catch (error) {
        error.status = 401;
        error.message = "Invalid email or password.";
        return next(error);
    }
    if (!isValidRecoveryPhrase(recoveryPhrase, existingUser.recoveryPhrase)) {
        const error = new Error('Invalid recovery phrase.');
        error.status = 400;
        return next(error);
    }
    try {

        await resetPasswordByRecoveryPhrase(existingUser.id, {newPassword:password})
        return res.status(200).json({
            message: "Password reset successfully",
        });
    } catch (err) {
        const error = new Error('Failed to change password.');
        error.status = 400;
        return next(error);
    }

}
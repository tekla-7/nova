import {isValidEmail, isValidPassword, isValidText} from "../utils/validation.js";
import {addUser, getUser} from "../data/users.js";
import {isValidPhoneNumber} from "libphonenumber-js";
import {createJSONToken} from "../utils/auth.js";

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
    if (!isValidPhoneNumber(data.phoneNumber)) {
        errors.phoneNumber = 'Invalid phone.';
    }
    if (Object.keys(errors).length > 0) {
        return res.status(422).json({
            message: 'User signup failed due to validation errors.',
            errors,
        });
    }
    try {
        const newUser = await addUser(data);
        const authToken = createJSONToken(newUser.id);
        return res.status(201).json({message: 'User created.', user: newUser, token: authToken});
    } catch (error) {
        const err = new Error('User creation failed');
        err.status = 400;
        next(err);
    }

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
    return res.status(200).json({
        message: "Login successful.",
        token,
        user: existingUser,
    });
}



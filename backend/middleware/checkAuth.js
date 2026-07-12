import {NotAuthError} from "../utils/errors.js";
import {validateJSONToken} from "../utils/auth.js";


export const checkAuth = (req, res, next) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
        const err = new Error("Not authorized");
        err.status = 401;
        return next(err);
    }
    const token = accessToken.split(' ')[1];
    try {
        req.user = validateJSONToken(token);
        return next();
    } catch (err) {
        const error = new Error("Invalid token");
        error.status = 401;
        return next(error);
    }


}

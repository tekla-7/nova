import jwt  from "jsonwebtoken";
const KEY = process.env.JWT_SECRET;
const REFRESH_KEY = process.env.JWT_REFRESH_SECRET;
export function createJSONToken(id) {
    return jwt.sign({ id }, KEY, { expiresIn: '1h' });
}
export function createRefreshToken(id){
    return jwt.sign({ id }, REFRESH_KEY, { expiresIn: '7d' });
}
export function validateJSONToken(token) {
    return jwt.verify(token, KEY)
}
export function validateJSONRefreshToken(token) {
    return jwt.verify(token,  REFRESH_KEY,)
}

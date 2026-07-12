import jwt  from "jsonwebtoken";
const KEY = process.env.JWT_SECRET;
export function createJSONToken(id) {
    return jwt.sign({ id }, KEY, { expiresIn: '1h' });
}
export function validateJSONToken(token) {
    return jwt.verify(token, KEY)
}
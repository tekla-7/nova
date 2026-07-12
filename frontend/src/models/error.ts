class ApiError extends Error {
    code: string|null|number;
    info: string|null;

    constructor(message: string, code: string|null|number, info: string|null) {
        super(message);
        this.code = code;
        this.info = info;
    }
}
export default ApiError;
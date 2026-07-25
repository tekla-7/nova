type ValidationErrors = Record<string, string>;

class ApiError extends Error {
    code: string|null|number;
    info: string|null;
    errors?: ValidationErrors;
    constructor(message: string, code: string|null|number, info: string|null,        errors?: ValidationErrors
    ) {
        super(message);
        this.code = code;
        this.info = info;
        this.errors = errors;
    }
}
export default ApiError;
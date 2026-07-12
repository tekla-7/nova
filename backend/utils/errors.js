export class NotFoundError {
    constructor(message) {
        this.message = message;
        this.status = 404;
    }
}

export class NotAuthError {
    constructor(message) {
        this.message = message;
        this.status = 401;
    }
}
class ApiError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
    }
}
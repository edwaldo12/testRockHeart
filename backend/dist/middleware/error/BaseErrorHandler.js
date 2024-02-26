"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseErrorHandler extends Error {
    constructor(message, name, statusCode) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = BaseErrorHandler;

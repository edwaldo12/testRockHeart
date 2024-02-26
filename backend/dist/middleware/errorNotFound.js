"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Error404NotFound extends Error {
    constructor(message, name = "NOT_FOUND") {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = 404;
        Error.captureStackTrace(this, this.constructor);
    }
}
const errorNotFound = (req, res, next) => {
    const protocol = req.protocol;
    const host = req.get("host");
    const originalUrl = req.originalUrl;
    throw new Error404NotFound(`The requested resource ${protocol}://${host}${originalUrl} does not exist on this server`);
};
exports.default = errorNotFound;

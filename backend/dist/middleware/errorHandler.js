"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const errorObj = { status: false };
    if (err) {
        switch (err.name) {
            case "NOT_FOUND":
            case "UNAUTHORIZED":
            case "BAD_REQUEST":
            case "FORBIDDEN":
            case "Endpoint Not Found":
            case "CLIENT_WRONG":
                errorObj.statusCode = err.statusCode;
                errorObj.message = err.message;
                break;
            default:
                errorObj.statusCode = 500;
                errorObj.message = err.message || "Internal Server Error";
                break;
        }
        errorObj.time = new Date().toString();
        res.status(errorObj.statusCode).json(errorObj);
    }
    else {
        next();
    }
};
exports.errorHandler = errorHandler;

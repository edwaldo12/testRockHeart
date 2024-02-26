"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseErrorHandler_1 = __importDefault(require("./BaseErrorHandler"));
class Error401ClientWrong extends BaseErrorHandler_1.default {
    constructor(message, name = "CLIENT_WRONG", statusCode = 401) {
        super(message, name, statusCode);
    }
}
exports.default = Error401ClientWrong;

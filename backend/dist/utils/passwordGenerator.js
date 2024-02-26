"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.passwordGenerator = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passwordGenerator = async (password) => {
    const saltRounds = 10;
    try {
        const hash = await bcrypt_1.default.hash(password, saltRounds);
        return hash;
    }
    catch (error) {
        console.error("Hashing error:", error);
        throw error;
    }
};
exports.passwordGenerator = passwordGenerator;
const comparePassword = async (candidatePassword, userPasswordHash) => {
    try {
        return await bcrypt_1.default.compare(candidatePassword, userPasswordHash);
    }
    catch (error) {
        console.error("Error comparing password:", error);
        throw error;
    }
};
exports.comparePassword = comparePassword;

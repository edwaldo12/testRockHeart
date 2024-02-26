"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configDb = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "edwaldo",
    DB: "e_wallet",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
exports.default = configDb;

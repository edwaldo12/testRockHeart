"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const ModelUser_1 = require("../models/ModelUser");
const ModelWallet_1 = require("../models/ModelWallet");
const Connection_1 = __importDefault(require("../config/Connection"));
exports.sequelize = new sequelize_1.Sequelize(Connection_1.default.DB, Connection_1.default.USER, Connection_1.default.PASSWORD, {
    host: Connection_1.default.HOST,
    dialect: "postgres",
    logging: false,
    pool: {
        max: Connection_1.default.pool.max,
        min: Connection_1.default.pool.min,
        acquire: Connection_1.default.pool.acquire,
        idle: Connection_1.default.pool.idle,
    },
});
const db = {
    Sequelize: sequelize_1.Sequelize,
    sequelize: exports.sequelize,
    user: (0, ModelUser_1.modelUser)(exports.sequelize),
    wallet: (0, ModelWallet_1.modelWallet)(exports.sequelize),
};
exports.default = db;

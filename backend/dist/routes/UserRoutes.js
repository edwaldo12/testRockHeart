"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userRepository = new UserRepository_1.default();
        this.userController = new UserController_1.default(this.userRepository);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/register", this.userController.register.bind(this.userController));
        this.router.post("/login", this.userController.login.bind(this.userController));
        this.router.get("/get_users/:id", this.userController.getUsers.bind(this.userController));
    }
}
exports.default = Routes;

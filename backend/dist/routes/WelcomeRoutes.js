"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WelcomeController_1 = require("../controllers/WelcomeController");
class WelcomeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get("/", WelcomeController_1.welcome);
    }
}
exports.default = WelcomeRoutes;

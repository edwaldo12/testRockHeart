"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const WalletRoutes_1 = __importDefault(require("./WalletRoutes"));
const WelcomeRoutes_1 = __importDefault(require("./WelcomeRoutes"));
const errorHandler_1 = require("../middleware/errorHandler");
const errorNotFound_1 = __importDefault(require("../middleware/errorNotFound"));
class Routes {
    constructor(app) {
        this.initializeRoutes(app);
        this.initializeMiddleware(app);
    }
    initializeRoutes(app) {
        const userRouter = new UserRoutes_1.default().router;
        const walletRouter = new WalletRoutes_1.default().router;
        const welcomeRouter = new WelcomeRoutes_1.default().router;
        app.use("/api/users", userRouter);
        app.use("/api/wallets", walletRouter);
        app.use("/", welcomeRouter);
    }
    initializeMiddleware(app) {
        app.use(errorNotFound_1.default);
        app.use(errorHandler_1.errorHandler);
    }
}
exports.default = Routes;

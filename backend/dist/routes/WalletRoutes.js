"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WalletController_1 = __importDefault(require("../controllers/WalletController"));
const WalletRepository_1 = __importDefault(require("../repositories/WalletRepository"));
class WalletRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.walletRepository = new WalletRepository_1.default();
        this.walletController = new WalletController_1.default(this.walletRepository);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/top-up", this.walletController.topUpWallet.bind(this.walletController));
        this.router.post("/send", this.walletController.sendToOtherWallet.bind(this.walletController));
        this.router.get("/transactions/:user_fk", this.walletController.listAllTransactions.bind(this.walletController));
        this.router.get("/wallet_balance/:user_fk", this.walletController.showUserBalance.bind(this.walletController));
    }
}
exports.default = WalletRoutes;

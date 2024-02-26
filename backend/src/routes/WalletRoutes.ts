import { Router } from "express";
import WalletController from "../controllers/WalletController";
import WalletRepository from "../repositories/WalletRepository";

class WalletRoutes {
  router = Router();
  walletRepository = new WalletRepository();
  walletController = new WalletController(this.walletRepository);

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/top-up",
      this.walletController.topUpWallet.bind(this.walletController)
    );

    this.router.post(
      "/send",
      this.walletController.sendToOtherWallet.bind(this.walletController)
    );

    this.router.get(
      "/transactions/:user_fk",
      this.walletController.listAllTransactions.bind(this.walletController)
    );

    this.router.get(
      "/wallet_balance/:user_fk",
      this.walletController.showUserBalance.bind(this.walletController)
    );
  }
}

export default WalletRoutes;

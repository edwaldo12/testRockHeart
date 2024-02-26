/**
 * Controller handling wallet-related operations.
 */
import { Request, Response, NextFunction } from "express";
import WalletRepository from "../repositories/WalletRepository";
import Error500Server from "../middleware/error/Error500";

class WalletController {
  private walletRepository: WalletRepository;

  /**
   * Constructs a new WalletController instance.
   * @param walletRepository The repository for wallet-related operations.
   */
  constructor(walletRepository: WalletRepository) {
    this.walletRepository = walletRepository;
  }

  /**
   * Retrieves the balance of a user's wallet.
   * @param req The HTTP request object.
   * @param res The HTTP response object.
   * @param next The next function in the middleware chain.
   */
  async showUserBalance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { user_fk } = req.params;
      const balance = await this.walletRepository.getUserWalletBalance(
        parseInt(user_fk)
      );
      res.status(200).json(balance);
    } catch (err) {
      next(
        new Error500Server(err instanceof Error ? err.message : String(err))
      );
    }
  }

  /**
   * Tops up a user's wallet with a specified amount.
   * @param req The HTTP request object.
   * @param res The HTTP response object.
   * @param next The next function in the middleware chain.
   * @returns The updated wallet object.
   */
  async topUpWallet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { userId, amount } = req.body;
      const wallet = await this.walletRepository.topUpWallet(userId, amount);
      return res.status(200).json(wallet);
    } catch (err) {
      next(
        new Error500Server(err instanceof Error ? err.message : String(err))
      );
    }
  }

  /**
   * Sends a specified amount from one user's wallet to another user's wallet.
   * @param req The HTTP request object.
   * @param res The HTTP response object.
   * @param next The next function in the middleware chain.
   * @returns The updated wallet object.
   */
  async sendToOtherWallet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { fromUserId, toUserId, amount } = req.body;
      const wallet = await this.walletRepository.sendToOtherWallet(
        fromUserId,
        toUserId,
        amount
      );
      return res.status(200).json(wallet);
    } catch (err) {
      next(
        new Error500Server(err instanceof Error ? err.message : String(err))
      );
    }
  }

  /**
   * Lists all transactions associated with a user's wallet.
   * @param req The HTTP request object.
   * @param res The HTTP response object.
   * @param next The next function in the middleware chain.
   * @returns An array of transaction objects.
   */
  async listAllTransactions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { user_fk } = req.params;
      const transactions = await this.walletRepository.listAllTransactions(
        parseInt(user_fk)
      );
      return res.status(200).json(transactions);
    } catch (err) {
      next(
        new Error500Server(err instanceof Error ? err.message : String(err))
      );
    }
  }
}

export default WalletController;

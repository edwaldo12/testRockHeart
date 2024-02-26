"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error500_1 = __importDefault(require("../middleware/error/Error500"));
class WalletController {
    /**
     * Constructs a new WalletController instance.
     * @param walletRepository The repository for wallet-related operations.
     */
    constructor(walletRepository) {
        this.walletRepository = walletRepository;
    }
    /**
     * Retrieves the balance of a user's wallet.
     * @param req The HTTP request object.
     * @param res The HTTP response object.
     * @param next The next function in the middleware chain.
     */
    async showUserBalance(req, res, next) {
        try {
            const { user_fk } = req.params;
            const balance = await this.walletRepository.getUserWalletBalance(parseInt(user_fk));
            res.status(200).json(balance);
        }
        catch (err) {
            next(new Error500_1.default(err instanceof Error ? err.message : String(err)));
        }
    }
    /**
     * Tops up a user's wallet with a specified amount.
     * @param req The HTTP request object.
     * @param res The HTTP response object.
     * @param next The next function in the middleware chain.
     * @returns The updated wallet object.
     */
    async topUpWallet(req, res, next) {
        try {
            const { userId, amount } = req.body;
            const wallet = await this.walletRepository.topUpWallet(userId, amount);
            return res.status(200).json(wallet);
        }
        catch (err) {
            next(new Error500_1.default(err instanceof Error ? err.message : String(err)));
        }
    }
    /**
     * Sends a specified amount from one user's wallet to another user's wallet.
     * @param req The HTTP request object.
     * @param res The HTTP response object.
     * @param next The next function in the middleware chain.
     * @returns The updated wallet object.
     */
    async sendToOtherWallet(req, res, next) {
        try {
            const { fromUserId, toUserId, amount } = req.body;
            const wallet = await this.walletRepository.sendToOtherWallet(fromUserId, toUserId, amount);
            return res.status(200).json(wallet);
        }
        catch (err) {
            next(new Error500_1.default(err instanceof Error ? err.message : String(err)));
        }
    }
    /**
     * Lists all transactions associated with a user's wallet.
     * @param req The HTTP request object.
     * @param res The HTTP response object.
     * @param next The next function in the middleware chain.
     * @returns An array of transaction objects.
     */
    async listAllTransactions(req, res, next) {
        try {
            const { user_fk } = req.params;
            const transactions = await this.walletRepository.listAllTransactions(parseInt(user_fk));
            return res.status(200).json(transactions);
        }
        catch (err) {
            next(new Error500_1.default(err instanceof Error ? err.message : String(err)));
        }
    }
}
exports.default = WalletController;

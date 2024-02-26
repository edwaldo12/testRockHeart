"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Repository for wallet-related database operations.
 */
const ModelWallet_1 = require("../models/ModelWallet");
const ModelUser_1 = require("../models/ModelUser");
const DB_1 = require("../config/DB");
class WalletRepository {
    /**
     * Constructs a new WalletRepository instance.
     */
    constructor() {
        this.WalletModel = (0, ModelWallet_1.modelWallet)(DB_1.sequelize);
        this.UserModel = (0, ModelUser_1.modelUser)(DB_1.sequelize);
    }
    /**
     * Retrieves the balance of a user's wallet.
     * @param userId The ID of the user.
     * @returns The wallet balance or an object with a message if user not found.
     */
    async getUserWalletBalance(userId) {
        const user = await this.UserModel.findByPk(userId);
        if (!user) {
            return {
                message: "User not found",
            };
        }
        return user.wallet;
    }
    /**
     * Adds funds to a user's wallet.
     * @param userId The ID of the user.
     * @param amount The amount to be added.
     * @returns The updated wallet balance or an object with a message if user not found.
     */
    async topUpWallet(userId, amount) {
        const userWithWallet = await this.UserModel.findByPk(userId);
        if (!userWithWallet) {
            return {
                Message: "Wallet not found",
            };
        }
        await userWithWallet.increment("wallet", {
            by: amount,
        });
        await userWithWallet.reload();
        await this.WalletModel.create({
            user_fk: userId,
            transaction_description: "TOP-UP",
            amount: amount,
            createdAt: new Date(new Date()),
        });
        return userWithWallet.wallet;
    }
    /**
     * Transfers funds from one user's wallet to another user's wallet.
     * @param fromUserId The ID of the sender.
     * @param toUserId The ID of the receiver.
     * @param amount The amount to be transferred.
     * @returns The updated sender's wallet or an object with a message if sender or receiver not found.
     * @throws Error if sender has insufficient funds.
     */
    async sendToOtherWallet(fromUserId, toUserId, amount) {
        const senderWallet = await this.UserModel.findByPk(fromUserId);
        if (!senderWallet) {
            return {
                message: "Sender wallet not found",
            };
        }
        if (senderWallet.wallet < amount) {
            throw new Error("Insufficient funds");
        }
        const receiverWallet = await this.UserModel.findByPk(toUserId);
        if (!receiverWallet) {
            return {
                message: "Receiver wallet not found",
            };
        }
        await senderWallet.decrement("wallet", { by: amount });
        await receiverWallet.increment("wallet", { by: amount });
        await this.WalletModel.create({
            user_fk: fromUserId,
            transaction_description: "Sent to user " + receiverWallet.name,
            amount: -amount,
            createdAt: new Date(),
        });
        await this.WalletModel.create({
            user_fk: toUserId,
            transaction_description: "Received from user " + receiverWallet.name,
            amount: amount,
            createdAt: new Date(),
        });
        return senderWallet;
    }
    /**
     * Retrieves all transactions for a specific user.
     * @param user_fk The ID of the user.
     * @returns An array of wallet transactions.
     */
    async listAllTransactions(user_fk) {
        this.WalletModel = (0, ModelWallet_1.modelWallet)(DB_1.sequelize);
        this.UserModel = (0, ModelUser_1.modelUser)(DB_1.sequelize);
        const transactions = await this.WalletModel.findAll({
            where: { user_fk },
        });
        return transactions;
    }
}
exports.default = WalletRepository;

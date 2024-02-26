import { Wallet } from "../../models/ModelWallet";

export interface WalletIRepository {
  topUpWallet(userId: number, amount: number): Promise<{} | void>;
  sendToOtherWallet(
    fromUserId: number,
    toUserId: number,
    amount: number
  ): Promise<{} | void>;
  listAllTransactions(userId: number): Promise<Wallet[]>;
}

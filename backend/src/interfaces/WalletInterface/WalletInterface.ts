export interface WalletAttributes {
  id: number;
  user_fk: number;
  transaction_description: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface WalletTransactionAttributes {
  id?: number;
  user_fk: number;
  transaction_description: string;
  amount: number;
  createdAt: Date;
  updatedAt?: Date;
}

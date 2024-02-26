import { Sequelize, Model, DataTypes } from "sequelize";
import {
  WalletAttributes,
  WalletTransactionAttributes,
} from "../interfaces/WalletInterface/WalletInterface";
import { modelUser } from "./ModelUser";

export class Wallet
  extends Model<WalletAttributes, WalletTransactionAttributes>
  implements WalletAttributes
{
  id!: number;
  user_fk!: number;
  transaction_description!: string;
  amount!: number;
  createdAt!: Date;
  updatedAt!: Date;
}

export const modelWallet = (sequelize: Sequelize): typeof Wallet => {
  Wallet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", 
          key: "id",
        },
      },
      transaction_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "wallets",
    }
  );

  const UserModel = modelUser(sequelize);
  Wallet.belongsTo(UserModel, { foreignKey: "user_fk" });

  return Wallet;
};

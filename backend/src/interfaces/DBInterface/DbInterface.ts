import { Sequelize } from "sequelize";
import { User } from "../../models/ModelUser";
import { Wallet } from "../../models/ModelWallet";

export interface DbConnection {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  user: typeof User;
  wallet: typeof Wallet;
}

export interface ConfigDb {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
  dialect: string;
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}


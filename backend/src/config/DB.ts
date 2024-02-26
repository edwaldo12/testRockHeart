import { Sequelize, Dialect } from "sequelize";
import { modelUser } from "../models/ModelUser";
import { modelWallet } from "../models/ModelWallet";
import dbConfig from "../config/Connection";
import { DbConnection } from "../interfaces/DBInterface/DbInterface";

export const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: "postgres" as Dialect,
    logging: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db: DbConnection = {
  Sequelize,
  sequelize,
  user: modelUser(sequelize),
  wallet: modelWallet(sequelize),
};

export default db;

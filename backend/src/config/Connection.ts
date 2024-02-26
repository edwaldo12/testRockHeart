import { ConfigDb } from "../interfaces/DBInterface/DbInterface";
const configDb: ConfigDb = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "edwaldo",
  DB: "e_wallet",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default configDb;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelWallet = exports.Wallet = void 0;
const sequelize_1 = require("sequelize");
const ModelUser_1 = require("./ModelUser");
class Wallet extends sequelize_1.Model {
}
exports.Wallet = Wallet;
const modelWallet = (sequelize) => {
    Wallet.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_fk: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        transaction_description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: "wallets",
    });
    const UserModel = (0, ModelUser_1.modelUser)(sequelize);
    Wallet.belongsTo(UserModel, { foreignKey: "user_fk" });
    return Wallet;
};
exports.modelWallet = modelWallet;

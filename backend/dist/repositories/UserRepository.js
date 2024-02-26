"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Repository for user-related database operations.
 */
const DB_1 = require("../config/DB");
const ModelUser_1 = require("../models/ModelUser");
const passwordGenerator_1 = require("../utils/passwordGenerator");
const sequelize_1 = require("sequelize");
class UserRepository {
    /**
     * Constructs a new UserRepository instance.
     */
    constructor() {
        this.userModel = (0, ModelUser_1.modelUser)(DB_1.sequelize);
    }
    /**
     * Registers a new user in the database.
     * @param name The name of the user.
     * @param email The email of the user.
     * @param password The password of the user.
     * @returns The newly registered user object.
     */
    async register(name, email, password) {
        const hashedPassword = await (0, passwordGenerator_1.passwordGenerator)(password);
        const newUser = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            wallet: 0,
            createdAt: new Date(),
        });
        return newUser;
    }
    /**
     * Authenticates a user based on email and password.
     * @param email The email of the user.
     * @param password The password of the user.
     * @returns The user object if authentication succeeds, null otherwise.
     */
    async login(email, password) {
        const user = await this.userModel.findOne({ where: { email } });
        if (user) {
            const isMatch = await (0, passwordGenerator_1.comparePassword)(password, user.password);
            if (isMatch) {
                return user;
            }
        }
        return null;
    }
    /**
     * Retrieves all users except the one with the specified ID.
     * @param excludeId The ID of the user to exclude from the result.
     * @returns An array of user objects.
     */
    async getUsers(excludeId) {
        return await this.userModel.findAll({
            where: {
                id: {
                    [sequelize_1.Op.ne]: excludeId,
                },
            },
        });
    }
}
exports.default = UserRepository;

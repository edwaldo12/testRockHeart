"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error500_1 = __importDefault(require("../middleware/error/Error500"));
class UserController {
    /**
     * Constructs a new UserController.
     * @param userRepository An instance of UserRepository for user data access.
     */
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    /**
     * Handles user registration.
     * @param req The HTTP request object.
     * @param res The HTTP response object.
     * @param next The next function for error handling middleware.
     * @returns A Promise resolving to an HTTP response, or void if an error occurs.
     */
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const newUser = await this.userRepository.register(name, email, password);
            return res.status(201).json(newUser);
        }
        catch (err) {
            next(new Error500_1.default(err instanceof Error ? err.message : String(err)));
        }
    }
    /**
     * Handles user login.
     * @param req The HTTP request object.
     * @param res The HTTP response object.
     * @param next The next function for error handling middleware.
     * @returns A Promise resolving to an HTTP response, or void if an error occurs.
     */
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const isMatch = await this.userRepository.login(email, password);
            if (!isMatch) {
                return res.status(401).json({
                    error: "Authentication failed",
                });
            }
            return res.status(200).json({
                message: "Acknowledge",
                data: isMatch,
            });
        }
        catch (err) {
            next(new Error500_1.default(err instanceof Error ? err.message : String(err)));
        }
    }
    /**
     * Retrieves users by ID.
     * @param req The HTTP request object.
     * @param res The HTTP response object.
     * @param next The next function for error handling middleware.
     * @returns A Promise resolving to an HTTP response, or void if an error occurs.
     */
    async getUsers(req, res, next) {
        try {
            const { id } = req.params;
            const users = await this.userRepository.getUsers(parseInt(id));
            return res.status(200).json(users);
        }
        catch (err) {
            next(new Error500_1.default(err instanceof Error ? err.message : String(err)));
        }
    }
}
exports.default = UserController;

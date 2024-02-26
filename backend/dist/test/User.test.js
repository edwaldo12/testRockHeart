"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const Error500_1 = __importDefault(require("../middleware/error/Error500"));
const mockRequest = (body = {}, params = {}) => {
    return {
        body,
        params,
    };
};
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
const mockNext = jest.fn();
describe("UserController", () => {
    let userRepository;
    let userController;
    beforeEach(() => {
        userRepository = new UserRepository_1.default();
        userController = new UserController_1.default(userRepository);
    });
    describe("register", () => {
        it("should register a new user", async () => {
            const newUser = {
                name: "John Doe",
                email: "john@example.com",
                password: "password",
                wallet: 0,
            };
            const req = mockRequest(newUser);
            const res = mockResponse();
            userRepository.register = jest.fn().mockResolvedValue(newUser);
            await userController.register(req, res, mockNext);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newUser);
        });
        it("should handle errors during registration", async () => {
            const error = new Error("Registration failed");
            const newUser = {
                name: "John Doe",
                email: "john@example.com",
                password: "password",
                wallet: 0,
            };
            const req = mockRequest(newUser);
            const res = mockResponse();
            userRepository.register = jest.fn().mockRejectedValue(error);
            await userController.register(req, res, mockNext);
            expect(mockNext).toHaveBeenCalledWith(new Error500_1.default(error.message));
        });
    });
    describe("login", () => {
        it("should authenticate user login", async () => {
            const userData = {
                id: "1",
                name: "John Doe",
                email: "john@example.com",
                password: "password",
                wallet: 0,
            };
            const req = mockRequest({
                email: "john@example.com",
                password: "password",
            });
            const res = mockResponse();
            userRepository.login = jest.fn().mockResolvedValue(userData);
            await userController.login(req, res, mockNext);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Acknowledge",
                data: userData,
            });
        });
        it("should handle authentication failure", async () => {
            const req = mockRequest({
                email: "john@example.com",
                password: "wrongpassword",
            });
            const res = mockResponse();
            userRepository.login = jest.fn().mockResolvedValue(null);
            await userController.login(req, res, mockNext);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: "Authentication failed" });
        });
        it("should handle errors during login", async () => {
            const error = new Error("Login failed");
            const req = mockRequest({
                email: "john@example.com",
                password: "password",
            });
            const res = mockResponse();
            userRepository.login = jest.fn().mockRejectedValue(error);
            await userController.login(req, res, mockNext);
            expect(mockNext).toHaveBeenCalledWith(new Error500_1.default(error.message));
        });
    });
    describe("getUsers", () => {
        it("should get users by id", async () => {
            const users = [
                {
                    id: "1",
                    name: "John Doe",
                    email: "john@example.com",
                    password: "password",
                    wallet: 0,
                },
            ];
            const req = mockRequest({}, { id: "123" });
            const res = mockResponse();
            userRepository.getUsers = jest.fn().mockResolvedValue(users);
            await userController.getUsers(req, res, mockNext);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(users);
        });
        it("should handle errors during getUsers", async () => {
            const error = new Error("Failed to get users");
            const req = mockRequest({}, { id: "123" });
            const res = mockResponse();
            userRepository.getUsers = jest.fn().mockRejectedValue(error);
            await userController.getUsers(req, res, mockNext);
            expect(mockNext).toHaveBeenCalledWith(new Error500_1.default(error.message));
        });
    });
});

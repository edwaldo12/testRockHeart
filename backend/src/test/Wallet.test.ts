import { Request, Response } from "express";
import WalletController from "../controllers/WalletController";
import WalletRepository from "../repositories/WalletRepository";
import Error500Server from "../middleware/error/Error500";
import { Wallet } from "../models/ModelWallet";

const mockRequest = (body = {}) => {
  const req = {} as Request;
  req.params = { user_fk: "1" };
  req.body = body;
  return req;
};

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res as Response;
};

const mockNext = jest.fn();

const mockTransactions: Wallet[] = [
  new Wallet({
    id: 1,
    user_fk: 2,
    transaction_description: "Deposit",
    amount: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
];

describe("WalletController", () => {
  let controller: WalletController;
  let walletRepository: WalletRepository;

  beforeEach(() => {
    walletRepository = new WalletRepository();
    controller = new WalletController(walletRepository);
  });

  describe("showUserBalance", () => {
    it("should handle errors by calling next with an Error500Server", async () => {
      const req = mockRequest();
      const res = mockResponse();

      jest
        .spyOn(walletRepository, "getUserWalletBalance")
        .mockImplementation(() => {
          throw new Error("Some error");
        });

      await controller.showUserBalance(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error500Server));
    });
  });

  it("should top up wallet and return the new balance", async () => {
    const req = mockRequest({ userId: 1, amount: 500 });
    const res = mockResponse();

    jest
      .spyOn(walletRepository, "topUpWallet")
      .mockResolvedValue({ balance: 600 });

    await controller.topUpWallet(req, res, mockNext);

    expect(walletRepository.topUpWallet).toHaveBeenCalledWith(1, 500);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ balance: 600 });
  });

  it("should call next with an Error500Server on an error", async () => {
    const req = mockRequest({ userId: 1, amount: 500 });
    const res = mockResponse();
    const error = new Error("Some error");

    jest.spyOn(walletRepository, "topUpWallet").mockRejectedValue(error);

    await controller.topUpWallet(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(Error500Server));
  });

  it("should list all transactions for a user and return status 200 with transactions data", async () => {
    const req = mockRequest();
    const res = mockResponse();

    jest
      .spyOn(walletRepository, "listAllTransactions")
      .mockResolvedValue(mockTransactions);

    await controller.listAllTransactions(req, res, mockNext);

    expect(walletRepository.listAllTransactions).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTransactions);
  });

  it("should call next with an Error500Server on an error during listing transactions", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const error = new Error("Failed to list transactions");

    jest
      .spyOn(walletRepository, "listAllTransactions")
      .mockRejectedValue(error);

    await controller.listAllTransactions(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(Error500Server));
  });
});

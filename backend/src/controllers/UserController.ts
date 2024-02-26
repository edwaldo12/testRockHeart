/**
 * UserController handles HTTP requests related to user operations.
 */
import { Request, Response, NextFunction } from "express";
import UserRepository from "../repositories/UserRepository";
import Error500Server from "../middleware/error/Error500";

class UserController {
  private userRepository: UserRepository;

  /**
   * Constructs a new UserController.
   * @param userRepository An instance of UserRepository for user data access.
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Handles user registration.
   * @param req The HTTP request object.
   * @param res The HTTP response object.
   * @param next The next function for error handling middleware.
   * @returns A Promise resolving to an HTTP response, or void if an error occurs.
   */
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { name, email, password } = req.body;
      const newUser = await this.userRepository.register(name, email, password);
      return res.status(201).json(newUser);
    } catch (err) {
      next(
        new Error500Server(err instanceof Error ? err.message : String(err))
      );
    }
  }

  /**
   * Handles user login.
   * @param req The HTTP request object.
   * @param res The HTTP response object.
   * @param next The next function for error handling middleware.
   * @returns A Promise resolving to an HTTP response, or void if an error occurs.
   */
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
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
    } catch (err) {
      next(
        new Error500Server(err instanceof Error ? err.message : String(err))
      );
    }
  }

  /**
   * Retrieves users by ID.
   * @param req The HTTP request object.
   * @param res The HTTP response object.
   * @param next The next function for error handling middleware.
   * @returns A Promise resolving to an HTTP response, or void if an error occurs.
   */
  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const users = await this.userRepository.getUsers(parseInt(id));
      return res.status(200).json(users);
    } catch (err) {
      next(
        new Error500Server(err instanceof Error ? err.message : String(err))
      );
    }
  }
}

export default UserController;

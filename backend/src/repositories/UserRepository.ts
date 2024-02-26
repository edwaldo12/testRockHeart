/**
 * Repository for user-related database operations.
 */
import { sequelize } from "../config/DB";
import { User, modelUser } from "../models/ModelUser";
import { comparePassword, passwordGenerator } from "../utils/passwordGenerator";
import { UserIRepository } from "../interfaces/UserRepository/UserIRepository";
import { Op } from "sequelize";

class UserRepository implements UserIRepository {
  private userModel: typeof User;

  /**
   * Constructs a new UserRepository instance.
   */
  constructor() {
    this.userModel = modelUser(sequelize);
  }

  /**
   * Registers a new user in the database.
   * @param name The name of the user.
   * @param email The email of the user.
   * @param password The password of the user.
   * @returns The newly registered user object.
   */
  async register(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await passwordGenerator(password);
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
  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { email } });
    if (user) {
      const isMatch = await comparePassword(password, user.password);
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
  async getUsers(excludeId: number): Promise<User[]> {
    return await this.userModel.findAll({
      where: {
        id: {
          [Op.ne]: excludeId,
        },
      },
    });
  }
}

export default UserRepository;

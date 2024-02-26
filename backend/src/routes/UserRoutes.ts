import { Router } from "express";
import UserController from "../controllers/UserController";
import UserRepository from "../repositories/UserRepository";
import { modelUser } from "../models/ModelUser";
import { sequelize } from "../config/DB";

class Routes {
  router = Router();
  userRepository = new UserRepository();
  userController = new UserController(this.userRepository);

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/register",
      this.userController.register.bind(this.userController)
    );
    this.router.post(
      "/login",
      this.userController.login.bind(this.userController)
    );
    this.router.get(
      "/get_users/:id",
      this.userController.getUsers.bind(this.userController)
    );
  }
}

export default Routes;

import { Router } from "express";
import { welcome } from "../controllers/WelcomeController";

class WelcomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", welcome);
  }
}

export default WelcomeRoutes;

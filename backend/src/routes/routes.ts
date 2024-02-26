// Routes.ts
import { Application } from "express";
import UserRoutes from "./UserRoutes";
import WalletRoutes from "./WalletRoutes";
import WelcomeRoutes from "./WelcomeRoutes";
import { errorHandler } from "../middleware/errorHandler";
import errorNotFound from "../middleware/errorNotFound";

export default class Routes {
  constructor(app: Application) {
    this.initializeRoutes(app);
    this.initializeMiddleware(app);
  }

  private initializeRoutes(app: Application): void {
    const userRouter = new UserRoutes().router;
    const walletRouter = new WalletRoutes().router;
    const welcomeRouter = new WelcomeRoutes().router;

    app.use("/api/users", userRouter);
    app.use("/api/wallets", walletRouter);
    app.use("/", welcomeRouter);
  }
  private initializeMiddleware(app: Application): void {
    app.use(errorNotFound);
    app.use(errorHandler);
  }
}

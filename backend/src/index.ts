import "dotenv/config";
import cookieParser from "cookie-parser";
import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes/routes";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "*",
    };

    app.use(cors(corsOptions));
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}

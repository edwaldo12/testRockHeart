import { Request, Response, NextFunction } from "express";

class Error404NotFound extends Error {
  statusCode: number;

  constructor(message: string, name = "NOT_FOUND") {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = 404;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorNotFound = (req: Request, res: Response, next: NextFunction) => {
  const protocol = req.protocol;
  const host = req.get("host");
  const originalUrl = req.originalUrl;
  throw new Error404NotFound(
    `The requested resource ${protocol}://${host}${originalUrl} does not exist on this server`
  );
};

export default errorNotFound;

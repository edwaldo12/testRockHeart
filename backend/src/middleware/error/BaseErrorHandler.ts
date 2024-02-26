class BaseErrorHandler extends Error {
  statusCode: number;
  constructor(message: string, name: string, statusCode: number) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default BaseErrorHandler;

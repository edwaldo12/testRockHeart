import BaseErrorHandler from "./BaseErrorHandler";

class Error404NotFound extends BaseErrorHandler {
  constructor(message:string, name = "NOT_FOUND", statusCode = 404) {
    super(message, name, statusCode);
  }
}

export default Error404NotFound;

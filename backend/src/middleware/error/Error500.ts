import BaseErrorHandler from "./BaseErrorHandler";

class Error500Server extends BaseErrorHandler {
  constructor(
    message: string,
    name = "SOMETHING'S WRONG IN SERVER",
    statusCode = 500
  ) {
    super(message, name, statusCode);
  }
}

export default Error500Server;

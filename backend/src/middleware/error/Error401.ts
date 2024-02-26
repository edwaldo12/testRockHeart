import BaseErrorHandler from "./BaseErrorHandler";

class Error401ClientWrong extends BaseErrorHandler {
  constructor(message: string, name = "CLIENT_WRONG", statusCode = 401) {
    super(message, name, statusCode);
  }
}

export default Error401ClientWrong;

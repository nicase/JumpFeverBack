const Operation = require('../../Operation');

class LogInFromToken extends Operation {
  constructor({ authService, userService }) {
    super();
    this.authService = authService;
    this.userService = userService;
  }

  async execute(token) {
    const {
      SUCCESS, ERROR, BAD_TOKEN, DISABLED_ACCOUNT,
    } = this.outputs;

    try {
      const auth = await this.authService.checkAuthToken(token);
      const user = await this.userService.get(auth.user);

      return this.emit(SUCCESS, user);
    } catch (error) {
      if (error.message === 'AuthNotFoundError') {
        return this.emit(BAD_TOKEN, error);
      }
      if (error.message === 'DisabledUserError') {
        return this.emit(DISABLED_ACCOUNT, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

LogInFromToken.setOutputs(
  ['SUCCESS', 'ERROR', 'BAD_TOKEN', 'DISABLED_ACCOUNT'],
);

module.exports = LogInFromToken;

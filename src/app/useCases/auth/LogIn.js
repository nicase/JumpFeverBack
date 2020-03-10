const Operation = require('../../Operation');

class LogIn extends Operation {
  constructor({ authService, userService }) {
    super();
    this.authService = authService;
    this.userService = userService;
  }

  async execute(username, password) {
    const {
      SUCCESS, ERROR, BAD_USERNAME, DISABLED_ACCOUNT, BAD_PASSWORD,
    } = this.outputs;

    try {
      const auth = await this.authService.checkCredentials(username, password);
      const user = await this.userService.get(auth.user);

      return this.emit(SUCCESS, user);
    } catch (error) {
      if (error.message === 'AuthNotFoundError') {
        return this.emit(BAD_USERNAME, error);
      }
      if (error.message === 'DisabledUserError') {
        return this.emit(DISABLED_ACCOUNT, error);
      }
      if (error.message === 'InvalidPasswordError') {
        return this.emit(BAD_PASSWORD, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

LogIn.setOutputs(
  ['SUCCESS', 'ERROR', 'BAD_USERNAME', 'DISABLED_ACCOUNT', 'BAD_PASSWORD'],
);

module.exports = LogIn;

const Operation = require('../../Operation');

class SignUp extends Operation {
  constructor({ authService, userService }) {
    super();
    this.authService = authService;
    this.userService = userService;
  }

  async execute(userData) {
    const {
      SUCCESS, ERROR, BAD_EMAIL, BAD_PASSWORD, ALREADY_REGISTERED,
    } = this.outputs;
    let user;

    try {
      user = await this.userService.signUp(userData);
      await this.authService.signUp(userData, user.id);

      return this.emit(SUCCESS, user);
    } catch (error) {
      if (error.message === 'DuplicateEmailError') {
        return this.emit(ALREADY_REGISTERED, error);
      }
      if (error.message === 'BadEmailError') {
        return this.emit(BAD_EMAIL, error);
      }
      if (error.message === 'BadPasswordError') {
        await this.userService.delete(user.id);
        return this.emit(BAD_PASSWORD, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

SignUp.setOutputs(
  ['SUCCESS', 'ERROR', 'BAD_EMAIL', 'BAD_PASSWORD', 'ALREADY_REGISTERED'],
);

module.exports = SignUp;

const Operation = require('../../Operation');

class CreateUser extends Operation {
  constructor({ userService, authService }) {
    super();
    this.userService = userService;
    this.authService = authService;
  }

  async execute(userData) {
    const {
      SUCCESS, ERROR, ALREADY_REGISTERED, BAD_EMAIL, BAD_PASSWORD, DUPLICATED_USERNAME,
    } = this.outputs;
    let user;

    try {
      user = await this.userService.create(userData);
      await this.authService.create(userData, user.id);

      return this.emit(SUCCESS, user);
    } catch (error) {
      if (error.message === 'UserNotFoundError') {
        return this.emit(ALREADY_REGISTERED, error);
      }
      if (error.message === 'BadEmailError') {
        return this.emit(BAD_EMAIL, error);
      }
      if (error.message === 'DuplicatedUsername') {
        return this.emit(DUPLICATED_USERNAME, error);
      }
      if (error.message === 'BadPasswordError') {
        await this.userService.delete(user.id);
        return this.emit(BAD_PASSWORD, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

CreateUser.setOutputs(
  ['SUCCESS', 'ERROR', 'ALREADY_REGISTERED', 'BAD_EMAIL', 'BAD_PASSWORD', 'DUPLICATED_USERNAME'],
);

module.exports = CreateUser;

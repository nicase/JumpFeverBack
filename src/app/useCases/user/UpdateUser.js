const Operation = require('../../Operation');

class UpdateUser extends Operation {
  constructor({ userService }) {
    super();
    this.userService = userService;
  }

  async execute(userId, userData) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      const user = await this.userService.update(userId, userData);

      return this.emit(SUCCESS, user);
    } catch (error) {
      if (error.message === 'UserNotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

UpdateUser.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = UpdateUser;

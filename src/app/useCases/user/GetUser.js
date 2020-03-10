const Operation = require('../../Operation');

class GetUser extends Operation {
  constructor({ userService }) {
    super();
    this.userService = userService;
  }

  async execute(userId) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      const user = await this.userService.get(userId);

      return this.emit(SUCCESS, user);
    } catch (error) {
      if (error.message === 'UserNotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

GetUser.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetUser;

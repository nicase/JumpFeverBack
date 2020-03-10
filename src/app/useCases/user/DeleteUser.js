const Operation = require('../../Operation');

class DeleteUser extends Operation {
  constructor({ userService, authService }) {
    super();
    this.userService = userService;
    this.authService = authService;
  }

  async execute(userId) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      await this.userService.delete(userId);
      await this.authService.deleteByUserId(userId);

      return this.emit(SUCCESS, 'User deleted successfully');
    } catch (error) {
      return this.emit(ERROR, error);
    }
  }
}

DeleteUser.setOutputs(['SUCCESS', 'ERROR']);

module.exports = DeleteUser;

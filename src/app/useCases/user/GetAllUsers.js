const Operation = require('../../Operation');

class GetAllUsers extends Operation {
  constructor({ userService }) {
    super();
    this.userService = userService;
  }

  async execute(query = {}) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const filters = {};
      if (query.text) {
        filters.text = query.text;
      }

      const users = await this.userService.getAll(filters);

      return this.emit(SUCCESS, users);
    } catch (error) {
      return this.emit(ERROR, error);
    }
  }
}

GetAllUsers.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllUsers;

const Operation = require('../../Operation');

function compare(a, b) {
  if (a.XP > b.XP) {
    return -1;
  }
  if (a.XP < b.XP) {
    return 1;
  }
  return 0;
}

class GetAllUsers extends Operation {
  constructor({ userService }) {
    super();
    this.userService = userService;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const users = await this.userService.getAll({});

      users.sort(compare);

      return this.emit(SUCCESS, users);
    } catch (error) {
      return this.emit(ERROR, error);
    }
  }
}

GetAllUsers.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllUsers;

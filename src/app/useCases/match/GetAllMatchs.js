const Operation = require('../../Operation');

class GetAllMatchs extends Operation {
  constructor({ matchService }) {
    super();
    this.matchService = matchService;
  }

  async execute(query = {}) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const matchs = await this.matchService.getAll(query);

      return this.emit(SUCCESS, matchs);
    } catch (error) {
      return this.emit(ERROR, error);
    }
  }
}

GetAllMatchs.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllMatchs;

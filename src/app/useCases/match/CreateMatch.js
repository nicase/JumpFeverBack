const Operation = require('../../Operation');

class CreateMatch extends Operation {
  constructor({ matchService }) {
    super();
    this.matchService = matchService;
  }

  async execute(matchdata) {
    const {
      SUCCESS, ERROR, ALREADY_REGISTERED,
    } = this.outputs;
    let match;

    try {
      match = await this.matchService.create(matchdata);
      return this.emit(SUCCESS, match);
    } catch (error) {
      if (error.message === 'DuplicatedMatchError') {
        return this.emit(ALREADY_REGISTERED, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

CreateMatch.setOutputs(
  ['SUCCESS', 'ERROR', 'ALREADY_REGISTERED'],
);

module.exports = CreateMatch;

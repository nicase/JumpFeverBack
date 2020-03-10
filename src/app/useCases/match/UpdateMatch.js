const Operation = require('../../Operation');

class UpdateMatch extends Operation {
  constructor({ matchService }) {
    super();
    this.matchService = matchService;
  }

  async execute(matchId, matchData) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      const match = await this.matchService.update(matchId, matchData);

      return this.emit(SUCCESS, match);
    } catch (error) {
      if (error.message === 'MatchNotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

UpdateMatch.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = UpdateMatch;

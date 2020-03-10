const Operation = require('../../Operation');

class GetMatch extends Operation {
  constructor({ matchService }) {
    super();
    this.matchService = matchService;
  }

  async execute(matchId) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      const match = await this.matchService.get(matchId);

      return this.emit(SUCCESS, match);
    } catch (error) {
      if (error.message === 'MatchNotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

GetMatch.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetMatch;

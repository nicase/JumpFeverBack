const Operation = require('../../Operation');

class DeleteMatch extends Operation {
  constructor({ matchService, authService }) {
    super();
    this.matchService = matchService;
    this.authService = authService;
  }

  async execute(matchId) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      await this.matchService.delete(matchId);

      return this.emit(SUCCESS, 'Match deleted successfully');
    } catch (error) {
      return this.emit(ERROR, error);
    }
  }
}

DeleteMatch.setOutputs(['SUCCESS', 'ERROR']);

module.exports = DeleteMatch;

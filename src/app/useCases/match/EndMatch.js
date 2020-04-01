const Operation = require('../../Operation');


class EndMatch extends Operation {
  constructor({ matchService, userService }) {
    super();
    this.matchService = matchService;
    this.userService = userService;
  }

  async execute(userId, matchdata) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      const match = await this.matchService.get(matchdata.id);
      if (match.user1 === userId) {
        await this.matchService.update(matchdata.id, { winner: match.user2 });
        await this.userService.winner(match.user1);
        await this.userService.loser(match.user2);
      } else {
        await this.matchService.update(matchdata.id, { winner: match.user1 });
        await this.userService.winner(match.user2);
        await this.userService.loser(match.user1);
      }

      return this.emit(SUCCESS, 'OK');
    } catch (error) {
      if (error.message === 'MatchNotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

EndMatch.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = EndMatch;

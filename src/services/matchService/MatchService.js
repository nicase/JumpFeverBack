const MatchRepository = require('./MatchRepository');
const MatchEntity = require('./MatchEntity');

class MatchService {
  constructor({ mongoose }) {
    this.MatchRepository = new MatchRepository(mongoose);
  }

  async create(matchData) {
    const newMatchEntity = new MatchEntity(matchData);
    return this.MatchRepository.create(newMatchEntity);
  }

  getAll(filters) {
    return this.MatchRepository.getAll(filters);
  }

  async get(matchId) {
    return this.MatchRepository.get(matchId);
  }

  update(matchId, matchInfo) {
    return this.MatchRepository.update(matchId, matchInfo);
  }

  delete(matchId) {
    return this.MatchRepository.delete(matchId);
  }
}

module.exports = MatchService;

const matchSchema = require('./matchSchema');
const MatchEntity = require('./MatchEntity');

class MatchRepository {
  constructor(mongoose) {
    this.matchDAO = mongoose.model('Match', matchSchema);
    this.options = { runValidators: true, new: true };
  }

  async create(matchEntity) {
    const match = await this.matchDAO.create(matchEntity);
    return new MatchEntity(match);
  }

  async getAll(filters = {}) {
    const matchs = await this.matchDAO.find(filters).populate('match');
    return matchs.map((match) => new MatchEntity(match));
  }

  async get(matchId) {
    const match = await this.matchDAO.findById(matchId).populate('match');
    if (!match) {
      throw new Error('MatchNotFoundError');
    }
    return new MatchEntity(match);
  }

  async getOne(filter) {
    const match = await this.matchDAO.findOne(filter).populate('match');
    if (match) {
      return new MatchEntity(match);
    }
    return match;
  }

  async update(matchId, matchInfo) {
    const match = await this.matchDAO.findByIdAndUpdate(matchId, matchInfo, this.options);
    if (!match) {
      throw new Error('MatchNotFoundError');
    }

    return new MatchEntity(match);
  }

  delete(matchId) {
    return this.matchDAO.deleteOne({ _id: matchId });
  }
}

module.exports = MatchRepository;

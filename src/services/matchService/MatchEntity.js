class MatchEntity {
  constructor(matchData) {
    this.id = matchData.id;
    this.user1 = matchData.user1;
    this.user2 = matchData.user2;
    this.winner = matchData.winner;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(value) {
    this._createdAt = value;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set updatedAt(updatedAt) {
    this._updatedAt = updatedAt;
  }
}

module.exports = MatchEntity;

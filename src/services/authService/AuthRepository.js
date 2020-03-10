const authSchema = require('./authSchema');
const AuthEntity = require('./AuthEntity');

class AuthRepository {
  constructor(mongoose) {
    this.authDAO = mongoose.model('Auth', authSchema);
    this.options = { runValidators: true, new: true };
  }

  async create(authEntity) {
    const auth = await this.authDAO.create({
      user: authEntity.user,
      username: authEntity.username,
      encryptedPassword: authEntity.encryptedPassword,
      token: authEntity.token,
      enabled: authEntity.enabled,
    });
    return new AuthEntity(auth);
  }

  async getOne(filter) {
    const auth = await this.authDAO.findOne(filter);
    if (auth) {
      return new AuthEntity(auth);
    }
    return auth;
  }

  async update(authId, authInfo) {
    const auth = await this.authDAO.findByIdAndUpdate(authId, authInfo, this.options);
    if (!auth) throw new Error('AuthNotFoundError');

    return new AuthEntity(auth);
  }

  deleteOne(filter) {
    return this.authDAO.deleteOne(filter);
  }
}

module.exports = AuthRepository;

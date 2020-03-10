const jwt = require('jsonwebtoken');

const AuthRepository = require('./AuthRepository');
const AuthEntity = require('./AuthEntity');

class AuthService {
  constructor({ config, mongoose }) {
    this.config = config;
    this.authRepository = new AuthRepository(mongoose);
  }

  async updateTokenByEmail(email) {
    const authEntity = await this.authRepository.getOne({ email });
    if (!authEntity) throw new Error('AuthNotFoundError');
    if (authEntity.isDisabled()) throw new Error('DisabledUserError');

    const newToken = AuthService.generateToken();

    const aux = await this.authRepository.update(
      authEntity.id, { token: newToken },
    );
    aux.token = newToken;
    return aux;
  }

  async updatePasswordByToken(token, password) {
    const authEntity = await this.authRepository.getOne({ token });
    if (!authEntity) throw new Error('AuthNotFoundError');
    if (authEntity.isDisabled()) throw new Error('DisabledUserError');

    // Set and check password
    authEntity.password = password;

    return this.authRepository.update(
      authEntity.id, { encryptedPassword: authEntity.encryptedPassword },
    );
  }

  async updatePasswordByUserId(userId, password) {
    const authEntity = await this.authRepository.getOne({ user: userId });
    if (!authEntity) throw new Error('AuthNotFoundError');

    // Set and check password
    authEntity.password = password;

    return this.authRepository.update(
      authEntity.id, { encryptedPassword: authEntity.encryptedPassword },
    );
  }

  async updateAndCheckPasswordByUserId(userId, password, oldPassword) {
    const authEntity = await this.authRepository.getOne({ user: userId });
    if (!authEntity) throw new Error('AuthNotFoundError');

    // Validate, set and check password
    authEntity.validatePassword(oldPassword);
    authEntity.password = password;

    return this.authRepository.update(
      authEntity.id, { encryptedPassword: authEntity.encryptedPassword },
    );
  }

  async signUp(authData, userId) {
    const authEntity = new AuthEntity(Object.assign(authData, {
      user: userId, token: AuthService.generateToken(), enabled: true,
    }));
    return this.authRepository.create(authEntity);
  }

  async create(authData, userId) {
    const authEntity = new AuthEntity(Object.assign(authData, {
      user: userId, enabled: true,
    }));
    return this.authRepository.create(authEntity);
  }

  deleteByUserId(userId) {
    return this.authRepository.deleteOne({ user: userId });
  }

  async validateEmail(token) {
    const authEntity = await this.authRepository.getOne({ token });
    if (authEntity.isDisabled()) {
      return this.authRepository.update(authEntity.id, { enabled: true, token: null });
    }

    return authEntity;
  }

  async checkCredentials(username, password) {
    const authEntity = await this.authRepository.getOne({ username });
    if (!authEntity) throw new Error('AuthNotFoundError');
    if (authEntity.isDisabled()) throw new Error('DisabledUserError');

    authEntity.validatePassword(password);

    return authEntity;
  }

  async checkAuthToken(token) {
    const decodedToken = jwt.verify(token, this.config.httpServer.secret);
    if (!decodedToken) throw new Error('AuthNotFoundError');

    const authEntity = await this.authRepository.getOne({ user: decodedToken.userId });
    if (authEntity.isDisabled()) throw new Error('DisabledUserError');

    return authEntity;
  }

  generateAuthToken(userId) {
    return jwt.sign(
      { userId },
      this.config.httpServer.secret,
      { expiresIn: '7d' },
    );
  }

  static generateToken() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 30; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}

module.exports = AuthService;

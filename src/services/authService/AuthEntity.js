const bcrypt = require('bcrypt');

class AuthEntity {
  constructor(authData) {
    this.id = authData.id;
    this.username = authData.username;
    if (authData.encryptedPassword) {
      this.encryptedPassword = authData.encryptedPassword;
    }
    if (authData.password) {
      this.password = authData.password;
    }
    this.enabled = authData.enabled || false;
    this.user = authData.user;
    this.createdAt = authData.createdAt || new Date();
    this.updatedAt = authData.updatedAt || new Date();
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
  }

  get password() {
    return this._password;
  }

  set password(password) {
    const pswRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;

    if (!pswRegex.test(password) || password.length < 8) {
      throw new Error('BadPasswordError');
    }

    this._password = password;
    this._encryptedPassword = bcrypt.hashSync(password, 10);
  }

  get encryptedPassword() {
    return this._encryptedPassword;
  }

  set encryptedPassword(encryptedPassword) {
    this._encryptedPassword = encryptedPassword;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set updatedAt(updatedAt) {
    this._updatedAt = updatedAt;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(value) {
    this._createdAt = value;
  }

  get enabled() {
    return this._enabled;
  }

  set enabled(enabled) {
    this._enabled = enabled;
  }

  validatePassword(password) {
    if (!bcrypt.compareSync(password, this._encryptedPassword)) {
      throw new Error('InvalidPasswordError');
    }
  }

  isDisabled() {
    return !this._enabled;
  }
}

module.exports = AuthEntity;

const UserRepository = require('./UserRepository');
const UserEntity = require('./UserEntity');

class UserService {
  constructor({ mongoose }) {
    this.userRepository = new UserRepository(mongoose);
  }

  async signUp(userData) {
    const userEntityEmail = await this.userRepository.getOne({ email: userData.email });
    if (userEntityEmail) throw new Error('DuplicateEmailError');

    const userEntityUsername = await this.userRepository.getOne({ username: userData.username });
    if (userEntityUsername) throw new Error('DuplicateUsernameError');

    const newUserEntity = new UserEntity(Object.assign(userData, { role: 'client' }));
    return this.userRepository.create(newUserEntity);
  }

  async create(userData) {
    const userEntity = await this.userRepository.getOne({ email: userData.email });
    if (userEntity) throw new Error('DuplicateEmailError');

    const newUserEntity = new UserEntity(userData);
    return this.userRepository.create(newUserEntity);
  }

  getAll(filters) {
    const filter = {};
    if (filters.text) {
      filter.$or = [
        { username: { $regex: filters.text, $options: 'i' } },
        { email: { $regex: filters.text, $options: 'i' } },
      ];
    }

    return this.userRepository.getAll(filter);
  }

  get(userId) {
    return this.userRepository.get(userId);
  }

  update(userId, userInfo) {
    const userData = {};
    if (userInfo.username) {
      userData.username = userInfo.username;
    }

    if (userInfo.role) { // TODO: Check the security
      userData.role = userInfo.role;
    }

    return this.userRepository.update(userId, userData);
  }

  delete(userId) {
    return this.userRepository.delete(userId);
  }

  async winner(userId) {
    const user = await this.userRepository.get(userId);
    console.log(user);
    user.XP += 5;
    this.userRepository.update(userId, user);
  }

  async loser(userId) {
    const user = await this.userRepository.get(userId);
    console.log(user);
    if (user.XP >= 5) {
      user.XP -= 5;
      this.userRepository.update(userId, user);
    } else {
      user.XP = 0;
      this.userRepository.update(userId, user);
    }
  }
}

module.exports = UserService;

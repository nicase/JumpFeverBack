const userSchema = require('./userSchema');
const UserEntity = require('./UserEntity');

class UserRepository {
  constructor(mongoose) {
    this.userDAO = mongoose.model('User', userSchema);
    this.options = { runValidators: true, new: true };
  }

  async create(userEntity) {
    const user = await this.userDAO.create({
      username: userEntity.username,
      email: userEntity.email,
      role: userEntity.role,
    });
    return new UserEntity(user);
  }

  async getAll(filters = {}) {
    const users = await this.userDAO.find(filters);
    return users.map((user) => new UserEntity(user));
  }

  async get(userId) {
    const user = await this.userDAO.findById(userId);
    if (!user) throw new Error('UserNotFoundError');

    return new UserEntity(user);
  }

  async getOne(filter) {
    const user = await this.userDAO.findOne(filter);
    if (user) {
      return new UserEntity(user);
    }

    return user;
  }

  async update(userId, userInfo) {
    const user = await this.userDAO.findByIdAndUpdate(userId, userInfo, this.options);
    if (!user) throw new Error('UserNotFoundError');

    return new UserEntity(user);
  }

  delete(userId) {
    return this.userDAO.deleteOne({ _id: userId });
  }
}

module.exports = UserRepository;

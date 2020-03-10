const { Schema } = require('mongoose');

module.exports = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  XP: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    values: ['client', 'admin'],
    default: 'client',
  },
}, {
  timestamps: true,
});

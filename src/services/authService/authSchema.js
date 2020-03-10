const { Schema } = require('mongoose');

module.exports = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    unique: true,
    required: true,
    sparse: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  encryptedPassword: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

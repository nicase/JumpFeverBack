const { Schema } = require('mongoose');

module.exports = new Schema({
  user1: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, {
  timestamps: true,
});

const mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', false);
mongoose.set('useUnifiedTopology', true);

module.exports = mongoose;

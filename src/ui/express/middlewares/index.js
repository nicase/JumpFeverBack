const userIsAdmin = require('./userIsAdmin');
const checkUserAuthenticated = require('./checkUserAuthenticated');
const checkBadRequestErrors = require('./checkBadRequestErrors');

module.exports = {
  userIsAdmin,
  checkBadRequestErrors,
  checkUserAuthenticated,
};

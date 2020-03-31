const Status = require('http-status');
const { body } = require('express-validator');

const {
  checkBadRequestErrors, checkUserAuthenticated, userIsAdmin,
} = require('../../../middlewares');

module.exports = [
  checkUserAuthenticated,
  userIsAdmin,
  [
    body('email').isEmail(),
    body('password').isString().not().isEmpty(),
    body('role').isIn(['admin', 'client']),
    body('username').isString().not().isEmpty(),
  ],
  checkBadRequestErrors,
  (req, res, next) => {
    const createUser = req.container.resolve('CreateUser');
    const {
      SUCCESS, ERROR, ALREADY_REGISTERED, BAD_EMAIL, BAD_PASSWORD, DUPLICATED_USERNAME,
    } = createUser.outputs;

    createUser
      .on(SUCCESS, (user) => {
        res.status(Status.OK).json(user);
      })
      .on(BAD_PASSWORD, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: error.message,
          message: 'Password must contain at least 8 characters (upper, lower and number)',
        });
      })
      .on(ALREADY_REGISTERED, (error) => {
        res.status(Status.CONFLICT).json({
          type: error.message,
          message: 'Email already in database',
        });
      })
      .on(BAD_EMAIL, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: error.message,
          message: 'Email does not identify any user',
        });
      })
      .on(DUPLICATED_USERNAME, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: error.message,
          message: 'Username already in database',
        });
      })
      .on(ERROR, (err) => {
        next(err);
      });

    return createUser.execute(req.body);
  },
];

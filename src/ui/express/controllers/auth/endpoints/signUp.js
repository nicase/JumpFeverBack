const Status = require('http-status');
const { body } = require('express-validator');

const { checkBadRequestErrors } = require('../../../middlewares');

module.exports = [
  [
    body('email').isEmail(),
    body('password').isString().not().isEmpty(),
    body('username').isString().not().isEmpty(),
  ],
  checkBadRequestErrors,
  (req, res, next) => {
    const signUp = req.container.resolve('SignUp');
    const {
      SUCCESS, ERROR, BAD_EMAIL, BAD_PASSWORD, ALREADY_REGISTERED, DUPLICATED_USERNAME,
    } = signUp.outputs;

    signUp
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

    return signUp.execute(req.body);
  },
];

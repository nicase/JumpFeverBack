const Status = require('http-status');
const { body } = require('express-validator');

const {
  checkBadRequestErrors, checkUserAuthenticated,
} = require('../../../middlewares');

module.exports = [
  checkUserAuthenticated,
  [
    body('username').if(body('username').exists()).isString(),
  ],
  checkBadRequestErrors,
  (req, res, next) => {
    const updateMe = req.container.resolve('UpdateUser');
    const {
      SUCCESS, ERROR, NOT_FOUND,
    } = updateMe.outputs;

    updateMe
      .on(SUCCESS, (user) => {
        res.status(Status.OK).json(user);
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: error.message,
          message: 'Id does not identify any user',
        });
      })
      .on(ERROR, (err) => {
        next(err);
      });

    return updateMe.execute(req.user.id, req.body);
  },
];

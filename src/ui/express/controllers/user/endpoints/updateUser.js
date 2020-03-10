const Status = require('http-status');
const { param, body } = require('express-validator');

const {
  checkBadRequestErrors, checkUserAuthenticated, userIsAdmin,
} = require('../../../middlewares');

module.exports = [
  checkUserAuthenticated,
  userIsAdmin,
  [
    param('id').isMongoId(),
    body('username').if(body('username').exists()).isString(),
  ],
  checkBadRequestErrors,
  (req, res, next) => {
    const updateUser = req.container.resolve('UpdateUser');
    const {
      SUCCESS, ERROR, NOT_FOUND,
    } = updateUser.outputs;

    updateUser
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

    return updateUser.execute(req.params.id, req.body);
  },
];

const Status = require('http-status');
const { param } = require('express-validator');

const {
  checkBadRequestErrors, checkUserAuthenticated,
} = require('../../../middlewares');

module.exports = [
  checkUserAuthenticated,
  [
    param('id').isMongoId(),
  ],
  checkBadRequestErrors,
  (req, res, next) => {
    const getUser = req.container.resolve('GetUser');
    const {
      SUCCESS, ERROR, NOT_FOUND,
    } = getUser.outputs;

    getUser
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

    return getUser.execute(req.params.id);
  },
];

const Status = require('http-status');
// const { param } = require('express-validator');

const {
  checkBadRequestErrors, checkUserAuthenticated,
} = require('../../../middlewares');

module.exports = [
  checkUserAuthenticated,
  [
    // param('id').isMongoId(),
  ],
  checkBadRequestErrors,
  (req, res, next) => {
    const endMatch = req.container.resolve('EndMatch');
    const {
      SUCCESS, ERROR, NOT_FOUND,
    } = endMatch.outputs;

    endMatch
      .on(SUCCESS, (match) => {
        res.status(Status.OK).json(match);
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: error.message,
          message: 'Id does not identify any match',
        });
      })
      .on(ERROR, (err) => {
        next(err);
      });

    return endMatch.execute(req.user.id, req.body);
  },
];

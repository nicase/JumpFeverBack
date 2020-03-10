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
    const getMatch = req.container.resolve('GetMatch');
    const {
      SUCCESS, ERROR, NOT_FOUND,
    } = getMatch.outputs;

    getMatch
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

    return getMatch.execute(req.params.id);
  },
];

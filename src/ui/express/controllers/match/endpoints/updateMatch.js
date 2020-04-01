const Status = require('http-status');
const { param, body } = require('express-validator');

const {
  checkBadRequestErrors, checkUserAuthenticated, userIsAdmin,
} = require('../../../middlewares');

module.exports = [
  checkUserAuthenticated, userIsAdmin,
  [
    param('id').isMongoId(),
    body('name').if(body('name').exists()).isString(),
  ],
  checkBadRequestErrors,
  (req, res, next) => {
    const updateMatch = req.container.resolve('UpdateMatch');
    const {
      SUCCESS, ERROR, NOT_FOUND,
    } = updateMatch.outputs;

    updateMatch
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

    return updateMatch.execute(req.params.id, req.body);
  },
];

const Status = require('http-status');
const { param } = require('express-validator');

const {
  checkBadRequestErrors, checkUserAuthenticated, userIsAdmin,
} = require('../../../middlewares');

module.exports = [
  checkUserAuthenticated,
  userIsAdmin,
  [
    param('id').isMongoId(),
  ],
  checkBadRequestErrors,
  (req, res, next) => {
    const deleteMatch = req.container.resolve('DeleteMatch');
    const {
      SUCCESS, ERROR,
    } = deleteMatch.outputs;

    deleteMatch
      .on(SUCCESS, (info) => {
        res.status(Status.OK).json(info);
      })
      .on(ERROR, (err) => {
        next(err);
      });

    return deleteMatch.execute(req.params.id);
  },
];

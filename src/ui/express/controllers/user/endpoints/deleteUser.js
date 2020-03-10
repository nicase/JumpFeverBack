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
    const deleteUser = req.container.resolve('DeleteUser');
    const {
      SUCCESS, ERROR,
    } = deleteUser.outputs;

    deleteUser
      .on(SUCCESS, (info) => {
        res.status(Status.OK).json(info);
      })
      .on(ERROR, (err) => {
        next(err);
      });

    return deleteUser.execute(req.params.id);
  },
];

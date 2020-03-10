const Status = require('http-status');

const { checkUserAuthenticated } = require('../../../middlewares');

module.exports = [
  checkUserAuthenticated,
  (req, res, next) => {
    const deleteMe = req.container.resolve('DeleteUser');
    const {
      SUCCESS, ERROR,
    } = deleteMe.outputs;

    deleteMe
      .on(SUCCESS, (info) => {
        res.status(Status.OK).json(info);
      })
      .on(ERROR, (err) => {
        next(err);
      });

    return deleteMe.execute(req.user.id);
  },
];

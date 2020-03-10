const Status = require('http-status');

const { checkUserAuthenticated } = require('../../../middlewares');

module.exports = [
  checkUserAuthenticated,
  (req, res, next) => {
    const getMe = req.container.resolve('GetUser');
    const {
      SUCCESS, ERROR, NOT_FOUND,
    } = getMe.outputs;

    getMe
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

    return getMe.execute(req.user.id);
  },
];

const Status = require('http-status');

const {
  checkBadRequestErrors, checkUserAuthenticated,
} = require('../../../middlewares');

module.exports = [
  checkUserAuthenticated,
  checkBadRequestErrors,
  (req, res, next) => {
    const createMatch = req.container.resolve('CreateMatch');
    const {
      SUCCESS, ERROR, ALREADY_REGISTERED,
    } = createMatch.outputs;

    createMatch
      .on(SUCCESS, (match) => {
        res.status(Status.OK).json(match);
      })
      .on(ALREADY_REGISTERED, (error) => {
        res.status(Status.CONFLICT).json({
          type: error.message,
          message: 'Match already in database',
        });
      })
      .on(ERROR, (err) => {
        next(err);
      });
    console.log("-------------------------")
    console.log(req)
    console.log("-------------------------")
    return createMatch.execute(req.body);
  },
];

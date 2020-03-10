const Status = require('http-status');
const { query } = require('express-validator');

const {
  checkBadRequestErrors, checkUserAuthenticated,
} = require('../../../middlewares');

module.exports = [
  checkUserAuthenticated,
  [
    query('text').if(query('text').exists()).isString(),
  ],
  checkBadRequestErrors,
  (req, res, next) => {
    const getAllMatchs = req.container.resolve('GetAllMatchs');
    const {
      SUCCESS, ERROR,
    } = getAllMatchs.outputs;

    getAllMatchs
      .on(SUCCESS, (matchs) => {
        res.status(Status.OK).json(matchs);
      })
      .on(ERROR, (err) => {
        next(err);
      });

    return getAllMatchs.execute(req.query);
  },
];

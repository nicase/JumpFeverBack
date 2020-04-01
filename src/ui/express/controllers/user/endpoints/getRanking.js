const Status = require('http-status');
const { query } = require('express-validator');

const {
  checkBadRequestErrors,
} = require('../../../middlewares');

module.exports = [
  [
    query('text').if(query('text').exists()).isString(),
  ],
  checkBadRequestErrors,
  (req, res, next) => {
    const getAllUsers = req.container.resolve('GetRanking');
    const {
      SUCCESS, ERROR,
    } = getAllUsers.outputs;

    getAllUsers
      .on(SUCCESS, (users) => {
        res.status(Status.OK).json(users);
      })
      .on(ERROR, (err) => {
        next(err);
      });

    return getAllUsers.execute();
  },
];

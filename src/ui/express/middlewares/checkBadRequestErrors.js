const { validationResult } = require('express-validator');
const Status = require('http-status');

module.exports = [
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(Status.BAD_REQUEST).json({ errors: errors.array() });
    }
    return next();
  },
];

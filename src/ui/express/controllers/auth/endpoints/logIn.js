const Status = require('http-status');
const passport = require('passport');

module.exports = [
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    if (!req.user) {
      return res.status(Status.UNAUTHORIZED).json({
        type: 'UnauthorizedError',
      });
    }

    const authService = req.container.resolve('authService');
    try {
      const token = await authService.generateAuthToken(req.user.id);
      return res.status(Status.OK).json({ token, user: req.user });
    } catch (error) {
      return next(error);
    }
  },
];

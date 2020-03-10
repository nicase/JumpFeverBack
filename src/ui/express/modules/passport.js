const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const initLocalStrategy = () => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (request, username, password, done) => {
      const logIn = request.container.resolve('LogIn');

      const {
        SUCCESS, ERROR, BAD_USERNAME, BAD_PASSWORD, DISABLED_ACCOUNT,
      } = logIn.outputs;

      logIn
        .on(SUCCESS, (user) => done(null, user))
        .on(BAD_USERNAME, () => done(null, false, { messages: 'Incorrect username' }))
        .on(BAD_PASSWORD, () => done(null, false, { messages: 'Incorrect password' }))
        .on(DISABLED_ACCOUNT, () => done(null, false, { messages: 'Disabled account' }))
        .on(ERROR, (error) => done(error));

      logIn.execute(username, password);
    },
  ));
};

const initBearerStrategy = () => {
  passport.use(new BearerStrategy(
    { passReqToCallback: true },
    (request, token, done) => {
      const logInFromToken = request.container.resolve('LogInFromToken');
      const {
        SUCCESS, ERROR, BAD_TOKEN, DISABLED_ACCOUNT,
      } = logInFromToken.outputs;

      logInFromToken
        .on(SUCCESS, (user) => done(null, user, { scope: 'read' }))
        .on(BAD_TOKEN, () => done(null, false, { messages: 'Bad token' }))
        .on(DISABLED_ACCOUNT, () => done(null, false, { messages: 'Disabled account' }))
        .on(ERROR, (error) => done(error));
      logInFromToken.execute(token);
    },
  ));
};

const initPassport = () => {
  initLocalStrategy();
  initBearerStrategy();
};


module.exports = {
  initPassport,
};

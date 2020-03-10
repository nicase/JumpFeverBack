const { Router } = require('express');

const login = require('./endpoints/logIn');
const signUp = require('./endpoints/signUp');

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/signup', signUp);

module.exports = authRouter;

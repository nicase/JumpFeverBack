const Status = require('http-status');
const { Router } = require('express');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const UserController = require('./controllers/user');
const AuthController = require('./controllers/auth');
const MatchController = require('./controllers/match');

const apiRouter = Router();
apiRouter.use('/user', UserController);
apiRouter.use('/auth', AuthController);
apiRouter.use('/match', MatchController);


const router = Router();
router.use('/api', apiRouter);
router.use('/status', (req, res) => res.status(Status.OK).json({ status: 'OK' }));

router.use(express.static(path.resolve(path.join(__dirname, '../../static'))));

router.use(cookieParser());

router.get('/', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '../../static/html/home.html')));
});

router.get('/login', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '../../static/html/login.html')));
});

router.get('/dashboard', (req, res) => {
  const { token } = req.cookies;
  if (!token) res.redirect('/login');
  else { res.sendFile(path.resolve(path.join(__dirname, '../../static/html/dashboard.html'))); }
});

router.get('/game', (req, res) => {
  const { token } = req.cookies;
  if (!token) res.redirect('/login');
  else { res.sendFile(path.resolve(path.join(__dirname, '../../static/html/game.html'))); }
});

router.get('/ranking', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '../../static/html/ranking.html')));
});

router.get('/signup', (req, res) => {
  res.send('Sign up :)');
});

router.get('/match/:matchId', (req, res) => {
  const { token } = req.cookies;
  if (!token) res.redirect('/login');
  else { res.sendFile(path.resolve(path.join(__dirname, '../../static/html/createGame.html'))); }
});

// router.get('/*', (req, res) => {
//   res.redirect('/');
// });

module.exports = router;

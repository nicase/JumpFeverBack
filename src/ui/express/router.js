const Status = require('http-status');
const { Router } = require('express');

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

const express = require('express');
const path = require('path')
router.use(express.static(__dirname + '../../../static'))

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '../../../static/html/login.html'));
});


module.exports = router;

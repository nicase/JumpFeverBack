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
router.get('/', (req, res) => {
  res.sendFile('/home/pauescofet/Desktop/pau/JumpFeverBack/src/static/index.html');
});


module.exports = router;

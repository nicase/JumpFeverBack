const { Router } = require('express');

const createUser = require('./endpoints/createUser');
const getMe = require('./endpoints/getMe');
const getAllUsers = require('./endpoints/getAllUsers');
const getUser = require('./endpoints/getUser');
const deleteUser = require('./endpoints/deleteUser');
// const deleteMe = require('./endpoints/deleteMe');
const updateMe = require('./endpoints/updateMe');
const updateUser = require('./endpoints/updateUser');
const getRanking = require('./endpoints/getRanking');


const userRouter = Router();

userRouter.get('/ranking/', getRanking);

// Authenticated
userRouter.get('/me/', getMe);
userRouter.put('/me/', updateMe);
// userRouter.delete('/me/', deleteMe);
userRouter.get('/', getAllUsers);
userRouter.get('/:id/', getUser);

// Admin
userRouter.post('/', createUser);
userRouter.put('/:id/', updateUser);
userRouter.delete('/:id/', deleteUser);

module.exports = userRouter;

const { Router } = require('express');

const getAllMatchs = require('./endpoints/getAllMatchs');
const createMatch = require('./endpoints/createMatch');
const updateMatch = require('./endpoints/updateMatch');
const deleteMatch = require('./endpoints/deleteMatch');
const getMatch = require('./endpoints/getMatch');
const startMatch = require('./endpoints/startMatch');


const matchRouter = Router();

matchRouter.get('/startMatch', startMatch);

// Authenticated
matchRouter.get('/', getAllMatchs);
matchRouter.get('/:id/', getMatch);

// Admin
matchRouter.post('/', createMatch);
matchRouter.put('/:id/', updateMatch);
matchRouter.delete('/:id/', deleteMatch);

module.exports = matchRouter;

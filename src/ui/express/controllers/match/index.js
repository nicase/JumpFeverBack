const { Router } = require('express');

const getAllMatchs = require('./endpoints/getAllMatchs');
const createMatch = require('./endpoints/createMatch');
const updateMatch = require('./endpoints/updateMatch');
const deleteMatch = require('./endpoints/deleteMatch');
const getMatch = require('./endpoints/getMatch');
const startMatch = require('./endpoints/startMatch');
const endMatch = require('./endpoints/endMatch');


const matchRouter = Router();

matchRouter.post('/startMatch', startMatch);
matchRouter.post('/endMatch', endMatch);

// Authenticated
matchRouter.get('/', getAllMatchs);
matchRouter.get('/:id/', getMatch);

// Admin
matchRouter.post('/', createMatch);
matchRouter.put('/:id/', updateMatch);
matchRouter.delete('/:id/', deleteMatch);

module.exports = matchRouter;

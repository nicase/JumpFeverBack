/* eslint-disable max-len */
const { createServer } = require('http'); // TOCHECK
const {
  asValue,
} = require('awilix');
const container = require('./di/container');
const HttpServer = require('./ui/HttpServer');


// Setup the infrastructure
//
// 1. Databases
// 2. Logger
// 3. Config
const database = container.resolve('mongoose');
const config = container.resolve('config');
const logger = container.resolve('logger');

// Setup the user interface
// 1. Express
// 2. HTTP Server
const express = container.resolve('express');
const httpServer = new HttpServer(config, logger, database, express);

// Setup the platform stop
function shutdownServerHandler(signal) {
  logger.info(`Received ${signal}`);
  httpServer.stop();
  logger.info('App closed');
  process.exit(0);
}
process.on('SIGINT', shutdownServerHandler);
process.on('SIGTERM', shutdownServerHandler);

// Start the entire platform
httpServer
  .start()
  .then(() => {
    logger.info('Application created.');
    container.register({
      server: asValue(httpServer.server),
    });
    /* const io = socketio(httpServer.server);
    io.on('connection', (socket) => { // TODO: Logica Okey pero s'ha de fer servir en un cas d'us on sapiga qui està jugant el partit perque farem nom socket = 'Player1' + player.id
      socket.on('player1', (data) => {
        socket.emit('player2', data);
      });
      socket.on('player2', (data) => {
        socket.emit('player1', data);
      });
    }); */
  })
  .catch((err) => {
    logger.error(`Application error: ${err}`);
    httpServer.stop();
    process.exit(1);
  });
module.exports = createServer(express.getRequestListener()); // TOCHECK

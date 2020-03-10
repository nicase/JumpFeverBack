const socketio = require('socket.io');
const server = require('../../../bffServer');
const Operation = require('../../Operation');


class StartMatch extends Operation {
  constructor({ matchService }) {
    super();
    this.matchService = matchService;
  }

  async execute() {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      const io = socketio(server);
      await io.on('connection', (socket) => {
        socket.emit('qwerty', { hello: 'world33' });
      });

      return this.emit(SUCCESS, 'OK');
    } catch (error) {
      if (error.message === 'MatchNotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

StartMatch.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = StartMatch;

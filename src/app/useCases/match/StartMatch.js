const socketio = require('socket.io');
const Operation = require('../../Operation');


class StartMatch extends Operation {
  constructor({ matchService }) {
    super();
    this.matchService = matchService;
  }

  async execute(server) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      const io = socketio(server);
      io.on('connection', (socket) => {
        socket.emit('player1', { hello: 'player1 socket' });
        socket.emit('player2', { hello: 'player2 socket' });

        socket.on('player1', (data) => {
          io.sockets.emit('player2', data);
        });

        socket.on('player2', (data) => {
          io.sockets.emit('player1', data);
        });
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

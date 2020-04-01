const socketio = require('socket.io');
const Operation = require('../../Operation');


class StartMatch extends Operation {
  constructor({ matchService }) {
    super();
    this.matchService = matchService;
  }

  async execute(matchdata, server) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      const io = socketio(server);
      const seed = Math.floor(Math.random() * 10000);
      io.on('connection', (socket) => {
        socket.emit('player1', { seed });
        socket.emit('player2', { seed });

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

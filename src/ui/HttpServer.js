const { createServer } = require('http');

class Http2Server {
  constructor(config, logger, database, express) {
    this.config = config;
    this.logger = logger;
    this.database = database;
    this.express = express;

    this.server = null;
  }

  start() {
    return new Promise((resolve, reject) => {
      this.logger.info(`NODE ENV: ${this.config.env}`);

      if (!this.database) {
        reject(new Error('Database instance not defined'));
      }

      this.database.connect(this.config.database.url, { useNewUrlParser: true })
        .then(() => {
          this.logger.info(
            `Successfully connected to ${this.config.database.url}`,
          );

          if (this.server === null) {
            const port = parseInt(this.config.httpServer.port, 10);
            const { hostname } = this.config.httpServer;

            this.server = createServer(this.express.getRequestListener());

            this.server.on('error', (error) => {
              this.logger.error(`HTTP Server Error: ${error}`);
              reject(new Error('HTTP Server Error'));
            });
            this.server.on('listening', () => {
              const addr = this.server.address();

              let bind;
              if (typeof addr === 'string') {
                bind = `pipe ${addr}`;
              } else {
                bind = `port ${addr.port}`;
              }

              this.logger.info(`Listening on ${bind}`);
            });
            this.server.on('close', () => {
              this.logger.info('Server closed programmatically');
              this.server = null;
            });

            this.server.listen(port, hostname, () => {
              this.logger.info(`[p ${process.pid}] HTTP Server process created`);
            });
            resolve();
          } else {
            reject(new Error('Server already started'));
          }
        })
        .catch((err) => {
          reject(new Error(
            'Error while attempting to connect to database.\n'
            + `${err.stack}`,
          ));
        });
    });
  }

  stop() {
    if (this.server !== null) {
      this.logger.info('Closing Server programmatically');
      this.server.close();
    } else {
      this.logger.info('Server not started yet');
    }
  }
}

module.exports = Http2Server;

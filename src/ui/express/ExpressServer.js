const express = require('express');
const cors = require('cors');
const compression = require('compression');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./router');
const initModules = require('./modules');

class ExpressServer {
  constructor({ config, logger, awilixContainer }) {
    this.config = config;
    this.logger = logger;
    this.awilixContainer = awilixContainer;
    this.express = express();

    // =========================================================================
    // Middlewares
    // =========================================================================

    if (this.config.logging.showAccessLogs) {
      const loggerAdapter = {
        toStream(_logger) {
          return {
            write(message) {
              _logger.info(message.slice(0, -1));
            },
          };
        },
      };
      this.express.use(
        morgan('dev', {
          stream: loggerAdapter.toStream(this.logger),
        }),
      );
    }

    this.express.use(methodOverride('X-HTTP-Method-Override'));
    this.express.use(cors());
    this.express.use(compression());
    this.express.use(bodyParser.json({ limit: '50mb' }));
    this.express.use(bodyParser.urlencoded({ extended: true }));

    this.express.enable('trust proxy');

    this.express.use((req, res, next) => {
      res.setHeader('X-Powered-By', 'Jump Fever');
      next();
    });

    // Awilix Middleware
    this.express.use((req, res, next) => {
      req.container = this.awilixContainer.createScope();
      return next();
    });

    // =========================================================================
    // Routes
    // =========================================================================

    this.express.use(router);

    // =========================================================================
    // Error Handler
    // =========================================================================

    this.express.use((err, req, res, next) => {
      this.logger.error(JSON.stringify(err));
      return next(err);
    });

    initModules(this.config);
  }

  getRequestListener() {
    return this.express;
  }
}

module.exports = ExpressServer;

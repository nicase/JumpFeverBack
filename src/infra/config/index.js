const path = require('path');
const fs = require('fs');

const currentEnv = process.env.NODE_ENV || 'development';
const corsOrigin = process.env.CORS_ORIGIN || ['*'];

const certPath = path.join(__dirname, './cert/certificate.crt');
const keyPath = path.join(__dirname, './cert/certificate.key');

const config = {
  env: currentEnv,
  isProd: currentEnv === 'production',
  logging: {
    level: process.env.LOGGING_LEVEL || 'info',
    showAccessLogs: process.env.LOGGING_ACCESS === 'true',
  },
  httpServer: {
    port: process.env.API_SERVER_PORT || '5000',
    hostname: '0.0.0.0',
    secret: process.env.API_SERVER_SECRET || 'ThisHaveToBeChanged',
    cors: {
      origin: corsOrigin,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      optionsSuccessStatus: 204,
      preflightContinue: false,
      maxAge: 1728000,
      credentials: true,
    },
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  },
  database: {
    url: process.env.DATABASE_URL || 'mongodb://localhost/jumpfeverdb',
  },
  backOffice: {
    url: process.env.FQN_ADMIN_SERVER || 'http://localhost:4200',
  },
};

module.exports = config;

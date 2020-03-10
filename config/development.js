module.exports = {
  env: 'development',
  db: 'mongodb://localhost/jumpfeverdb',
  port: process.env.API_SERVER_PORT || '5000',
};

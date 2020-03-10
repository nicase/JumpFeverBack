module.exports = {
  env: 'production',
  db: 'mongodb://localhost/jumpfeverdb',
  port: process.env.API_SERVER_PORT || '5000',
};

require('dotenv').config();

module.exports = {
  node_env: process.env.NODE_ENV,
  app: {
    port: process.env.APP_PORT
  },
  db: {
    uri: process.env.DB_URI
  }
};

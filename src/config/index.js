require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  app: {
    port: process.env.APP_PORT
  },
  db: {
    uri: process.env.DB_URI
  },
  bcrypt: {
    saltRound: process.env.SALTROUND || 10
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expired: '45m'
  }
};

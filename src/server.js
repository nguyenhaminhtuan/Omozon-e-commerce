// Requires dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const config = require('./config');
const errors = require('./middlewares/error');
const allowDomain = require('./middlewares/allowDonmains');
require('express-async-errors');

// Create Express server
const server = express();

// Config connect MongoDB using mongoose
const db = mongoose.connection;
mongoose.connect(config.db.uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.info('Connected databse!'));

// Body parser
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
// Cross Origin Resoruce Sharing
server.use(cors());
server.use(allowDomain);
// Morgan logger
server.use(morgan('dev'));

// Using routes
server.use('/api', routes);

// Middleware handle errors
server.use(errors.notFound);
server.use(errors.handler);

// Start server
server.listen(config.app.port, () =>
  console.info(`Server running at port ${config.app.port}...`)
);

module.exports = server;

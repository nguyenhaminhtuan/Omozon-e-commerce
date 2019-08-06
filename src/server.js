// Requires dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const config = require('./config');
const allowDomain = require('./middlewares/allowDonmains');

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
db.once('open', function() {
  console.info('Connected databse!');
});

// Body parser
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
// Cross Origin Resoruce Sharing
server.use(cors());
server.use(allowDomain);
// Morgan logger
server.use(morgan('dev'));

// Using routes
server.use('/', routes);

// Middleware handle not found url
server.use(function(req, res, next) {
  const error = new Error('Not Found!');
  error.status = 404;
  next(error);
});

// Middleware handle errors
// eslint-disable-next-line no-unused-vars
server.use(function(err, req, res, next) {
  if (config.node_env !== 'production') {
    res.status(err.status || 500).json({ error: err.message });
  } else {
    console.error(err.message);
    res.status(500).json({ message: 'Oops, something went wrong!' });
  }
});

// Start server
server.listen(config.app.port, function() {
  console.info(`Server running at port ${config.app.port}...`);
});

module.exports = server;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const config = require('./configs');

const server = express();
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

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use(morgan('combined'));

server.use('/', routes);

server.use(function(req, res, next) {
  const err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

// eslint-disable-next-line no-unused-vars
server.use(function(err, req, res, next) {
  if (config.node_env !== 'production') {
    res.status(err.status || 500).json({ err: err.message });
  }
});

server.listen(config.app.port, function() {
  console.info(`Server running at port ${config.app.port}...`);
});

module.exports = server;

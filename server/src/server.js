const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index');
const error = require('./utils/error');
const allowDonmain = require('./utils/allowDonmain');
require('dotenv').config();

const server = express();
const db = mongoose.connection;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected databse!'));

server.use(cors());
server.use(allowDonmain);
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(`${__dirname}/public`));

server.use('/api', routes);
server.use(error.notFound);
server.use(error.handler);

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

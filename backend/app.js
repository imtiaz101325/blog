var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const db = require('./models');

async function checkConnection() {
  try {
    await db.sequelize.authenticate();
    console.log('Successfully connected to database.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

checkConnection();

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', indexRouter);

module.exports = app;

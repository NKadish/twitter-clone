const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tweetsRouter = require('./routes/tweets');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);

app.use('/', indexRouter);
app.use('/users', usersRouter(dbHelpers));
app.use('/tweets', tweetsRouter(dbHelpers));

module.exports = app;

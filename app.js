const express = require('express'),
    app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

let indexRouter = require('@routes/index'),
    usersRouter = require('@routes/users'),
    authRouter = require('@routes/auth'),
    apiRouter = require('@routes/api');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

module.exports = app;

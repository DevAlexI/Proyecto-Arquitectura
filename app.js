var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/*
var tasksRouter = require('./routes/tasks');
var authRouter = require('./routes/auth');
var paymentRouter = require('./routes/payment');
*/
var indexRouter = require('./routes/index');

var app = express();

console.log("Hello World");
// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
app.use('/auth', authRouter);
app.use('/tasks', tasksRouter);
app.use('/payment', paymentRouter);
*/
app.use('/', indexRouter);


module.exports = app;

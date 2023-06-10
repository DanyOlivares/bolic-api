import express from 'express'
import config from './config'

import DoctoresRoutes from './routes/Doctores.routes'

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Routes for HTML files

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/RealLog', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'RealLog.html'));
});

app.get('/game', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'game.html'));
});

// Routes for CSS files
app.get('/index.css', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.css'));
});

app.get('/login.css', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'login.css'));
});

app.get('/RealLog.css', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'RealLog.css'));
});

app.get('/game.css', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'game.css'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port', config.port);

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(DoctoresRoutes)

export default app


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var securityMiddleware = require('./middleware/security');

//import database file + config
require("dotenv").config(); 
require('./client/users')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sitesRouter = require('./routes/sites');
var adventuresRouter = require('./routes/adventure')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // changed to 'extended: true' to accept more diverse parsing, if needed
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(securityMiddleware.checkJWT); // is just to set req.user

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/sites', sitesRouter);
app.use('./adventure', adventuresRouter) 

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

module.exports = app;

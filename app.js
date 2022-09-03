var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
var dotenv = require('dotenv');
var session = require('express-session');
var sessionAuth = require('./middleware/sessionAuth')
var app = express();
app.use(session({
  secret: 'dummytext',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 30 * 24 * 60 * 60 * 1000}
}))
app.use(sessionAuth)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var formRouter = require('./routes/forms');
var locationRouter = require('./routes/locations')

mongoose.connect("mongodb://localhost/project", {usenewURLParser: true})
.then(async ()=>{
  console.log("Connected to MongoDB Successfully")
})
.catch(err =>{
  console.log(err.message)
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('routers/images'))
app.use(express.static('uploads'))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/forms',formRouter)
app.use('/locations',locationRouter)
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

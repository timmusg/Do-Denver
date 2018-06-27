var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var auth = require('./auth');


require('dotenv').load();

var routes = require('./routes/index');
var clients = require('./routes/clients/client');
var havedone = require('./routes/clients/havedone');
var todo = require('./routes/clients/todo');
var searches = require('./routes/clients/search');
var authenticate = require('./routes/authenticate');

var app = express();

app.use(auth.passport.initialize())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({keys: [process.env.SESSION_KEY1, process.env.SESSION_KEY2]}));
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', routes);
app.use('/', authenticate);
app.use('/clients', clients);
app.use('/clients', havedone);
app.use('/clients', todo);
app.use('/clients', searches);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var indexRoutes = require('./routes');
var appRoutes = require('./routes/api');

var app = express();

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/api/', appRoutes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send(err.message);
});

module.exports = app;

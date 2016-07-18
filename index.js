/* jshint node: true */
var express = require('express');
var path = require('path');

var logger = require('morgan'); //use morgan to log requests to console
var bodyParser = require('body-parser'); //used to parse incoming json requests


require('./lib/connection');
var messages = require('./routes/messages');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//applicaton routes
app.use(messages);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');

    err.status = 404;
    console.log("404 detected");
    next(err);
});

//error handlers

//development error handler
// will print stack trace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

//production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;

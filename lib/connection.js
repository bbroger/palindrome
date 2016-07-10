/* jshint node: true */
var mongoose = require('mongoose');
var dbUrl = process.env.MONGO_URL || 'mongodb://appuser:apppassword@ds017195.mlab.com:17195/palindrome';
console.log("Connecting to mongo via: " + dbUrl);

//LC TODO only use env var and then fail with error if it is not defined

mongoose.connect(dbUrl);

//Close the mongoose connection on Control+C
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected');
        process.exit(0);
    });
});

require('../models/message');

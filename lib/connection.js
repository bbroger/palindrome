/* jshint node: true */
var mongoose = require('mongoose');
var dbUrl = process.env.MONGO_URL;

if (!dbUrl) {
    console.error("Unable to start application - no MONGO_URL defined - halting.");
    process.exit(-1);
}
console.log("Connecting to mongo via: " + dbUrl);

mongoose.connect(dbUrl);

//Close the mongoose connection on Control+C
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected');
        process.exit(0);
    });
});

require('../models/message');

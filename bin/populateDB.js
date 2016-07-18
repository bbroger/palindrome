/* jshint node: true */
var async = require('async');
var mongoose = require('mongoose');
require(process.cwd() + '/lib/connection');
var Message = mongoose.model('Message');

var data = {
    messages: [
        {
            id: "abcd12341",
            text: "This is a test message",
            isPalindrome: false
        },
        {
            id: "abcd12342",
            text: "A bat tuba",
            isPalindrome: true
        },
        {
            id: "abcd12343",
            text: "A car, a man, a maraca",
            isPalindrome: true
        },
        {
            id: "abcd12344",
            text: "Amor roma",
            isPalindrome: true
        }
    ]
};

var deleteMessages = function (callback) {
    console.info('Deleting Messages');
    Message.remove({}, function (error, response) {
        if (error) {
            console.error('Error deleting Messages: ' + error);
        }

        console.info('Done deleting Messages');
        callback();
    });
};

var addMessages = function (callback) {
    console.info('Adding Messages');
    Message.create(data.messages, function (error) {
        if (error) {
            console.error('Error: ' + error);
        }

        console.info('Done adding Messages');
        callback();
    });
};

async.series([
    deleteMessages,
    addMessages
], function (error, results) {
    if (error) {
        console.error('Error: ' + error);
    }

    mongoose.connection.close();
    console.log('Done!');
});

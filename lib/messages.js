/* jshint node: true */
var mongoose = require('mongoose');
var Message = mongoose.model('Message');

//TODO probably should re-use this within the routes!!

function getMessages(callback) {
    Message.find().exec(callback); //TODO may want to sort these
}

function getPalindromes(callback) {
    Message.find({ isPalindrome: true }).exec(callback);
}

function getNonPalindromes(callback) {
    Message.find({ isPalindrome: false }).exec(callback);
}

function getMessage(messageId, callback) {
    Message.findOne({
        id: messageId
    }).exec(callback);
}

function deleteMessage(messageId, callback) {
    Message.remove({
        id: messageId
    }).exec(callback);
}

function updateMessage(messageId, newMessage, callback) {
    Message.update({
        id: messageId
    }, newMessage).exec(callback);
}

function newMessage(messageText, callback) {
    var newMessage = new Message({
        id: mongoose.Types.ObjectId(),
        text: messageText,
        isPalindrome: isPalindrome(messageText)
    });
    newMessage.save().exec(callback);
}

function isPalindrome(text) { //TODO this needs to be migrated to the main API
    if (!text) {
        return false;
    }

    text = text.replace(/[^\w]/g, ""); //remove all characters except a-z
    text = text.toLowerCase();
    if (text.length === 0) {
        return false;
    }

    return text == text.split('').reverse().join('');
}

exports.getMessages = getMessages;
exports.getMessage = getMessage;
exports.deleteMessage = deleteMessage;
exports.updateMessage = updateMessage;
exports.newMessage = newMessage;
exports.getPalindromes = getPalindromes;
exports.getNonPalindromes = getNonPalindromes;
exports.isPalindrome = isPalindrome;
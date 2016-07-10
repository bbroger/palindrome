var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        required: true
    },
    isPalindrome: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Message', MessageSchema);
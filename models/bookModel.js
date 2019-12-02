var monggose = require('mongoose'),
schema = monggose.Schema;

var bookModel = new schema({
    title: {type: String},
    author: {type: String},
    genre: {type: String},
    read: {type:Boolean, default: false}
});

module.exports = monggose.model('Book', bookModel);
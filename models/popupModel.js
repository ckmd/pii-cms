const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PopupSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    file:{
        type:String,
        default: ''
    },
    link:{
        type:String,
        default: ''
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
});

module.exports = {Popup: mongoose.model('popup', PopupSchema)};
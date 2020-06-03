const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SliderSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    position:{
        type: String,
        default: 'bottom'
    },
    slideke:{
        type:Number,
        default: null
    },
    file:{
        type:String,
        default: ''
    },
});

module.exports = {Slider: mongoose.model('slider', SliderSchema)};
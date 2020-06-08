const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const WilayahSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    file:{
        type:String,
        default: ''
    },
    slug: { 
        type: String,
        slug: "title" 
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = {Wilayah:  mongoose.model('wilayah', WilayahSchema)};
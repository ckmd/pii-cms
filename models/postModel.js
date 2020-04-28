const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public'
    },
    description: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    file:{
        type:String,
        default: ''
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    slug: { 
        type: String,
        slug: "title" }
});

module.exports = {Post: mongoose.model('post', PostSchema)};
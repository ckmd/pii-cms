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
    introText: {
        type: String,
        default: ''
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
    sponsor2:{
        type:String,
        default: ''
    },
    sponsor1:{
        type:String,
        default: ''
    },
    views: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        default: ''
    },
    videoLink: {
        type: String,
        default: ''
    },
    setAsRubix: {
        type: Boolean,
        default: false
    },
    setAsBanner: {
        type: Boolean,
        default: false
    },
    slug: { 
        type: String,
        slug: "title" 
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }
});

module.exports = {Post: mongoose.model('post', PostSchema)};
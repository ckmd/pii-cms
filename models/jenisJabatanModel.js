const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const JenisJabatanSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    slug: { 
        type: String,
        slug: "title" 
    },
});

module.exports = {JenisJabatan:  mongoose.model('jenisJabatan', JenisJabatanSchema)};
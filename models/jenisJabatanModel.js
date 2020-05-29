const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JenisJabatanSchema = new Schema({
    title: {
        type: String,
        required: true
    }
});

module.exports = {JenisJabatan:  mongoose.model('jenisJabatan', JenisJabatanSchema)};
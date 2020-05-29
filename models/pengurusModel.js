const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PengurusSchema = new Schema({
    nama: {
        type: String,
        required: true
    },
    jabatan: {
        type: String,
        required: true
    },
    urutanPengurus: {
        type: Number,
        default: 0
    },
    jenisJabatan:{
        type: Schema.Types.ObjectId,
        ref: 'jenisJabatan'
    },
    file:{
        type:String,
        default: ''
    },
    deskripsi: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
});

module.exports = {Pengurus: mongoose.model('pengurus', PengurusSchema)};
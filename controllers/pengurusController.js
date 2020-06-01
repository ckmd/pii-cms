const Pengurus = require('../models/pengurusModel').Pengurus;
const JenisJabatan = require('../models/jenisJabatanModel').JenisJabatan;
const {isEmpty} = require('../config/customFunction');

module.exports = {
    getPengurus : (req, res) => {
        Pengurus.find().populate('jenisJabatan').sort({urutanPengurus:'ascending'}).then( pengurus => {
            res.render('admin/pengurus/index', {pengurus : pengurus});
        });
    },
    submitPengurus: (req, res) => {
        let profilePicture;
        let filename = '';
        if(!isEmpty(req.files)){
            if(!isEmpty(req.files.uploadedFile)){
                let file = req.files.uploadedFile;
                filename = file.name;
                let uploadDir = './public/uploads/pengurus/';
                
                file.mv(uploadDir + filename, (err) =>{
                    if(err)
                        throw err;
                });
                profilePicture = `/uploads/pengurus/${filename}`;
            }
        }
        // if empty, use default profile picture
        else{
            profilePicture = '/uploads/default-profile-picture.png';
        }
        const newPengurus = new Pengurus({
            nama: req.body.nama,
            deskripsi: req.body.deskripsi,
            jabatan: req.body.jabatan,
            urutanPengurus: req.body.urutanPengurus,
            jenisJabatan: req.body.jenisJabatan,
            file: profilePicture,
        });
        newPengurus.save().then(pengurus => {
            req.flash('success-message', 'Pengurus added successfully.');
            res.redirect('/admin/pengurus');
        });
    },
    createPengurus : (req, res) => {
        JenisJabatan.find().then(jabatans => {
            res.render('admin/pengurus/create', {jabatans:jabatans});
        });
    },
    editPengurus: (req, res) => {
        const id = req.params.id;
        Pengurus.findById(id).then( pengurus => {
            JenisJabatan.find().then( jabatans => {
                res.render('admin/pengurus/edit', {pengurus : pengurus, jabatans:jabatans});
            });
        });
    },
    submitEditPengurus: (req, res) => {
        let filename = '';
        if(!isEmpty(req.files)){
            if(!isEmpty(req.files.uploadedFile)){
                let file = req.files.uploadedFile;
                filename = file.name;
                let uploadDir = './public/uploads/pengurus/';
            
                file.mv(uploadDir + filename, (err) =>{
                    if(err)
                        throw err;
                });
                req.body.file = `/uploads/pengurus/${filename}`;
            }else{
                const id = req.params.id;
                Pengurus.findById(id).then( pengurus => {
                    req.body.file = pengurus.file;
                });
            }
        }

        Pengurus.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, useFindAndModify: false}, (err, doc) =>{
            if(!err){
                req.flash('success-message', 'Pengurus edited successfully.');
                res.redirect('/admin/pengurus')
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    deletePengurus: (req, res) => {
        Pengurus.findByIdAndRemove(req.params.id, (err, doc) => {
            if(!err){
                res.redirect('/admin/pengurus');
            }else{
                console.log('error during delete record : '+ err);
            }
        });
    },
    // Janis Jabatan Pengurus
    getJenisJabatan: (req, res) => {
        JenisJabatan.find().then(jenisJabatans => {
            res.render('admin/jenis-jabatan/index', {jenisJabatans:jenisJabatans});
        });
    },
    createJenisJabatan : (req, res) => {
        res.render('admin/jenis-jabatan/create');
    },
    submitJenisJabatan:(req, res)=>{
        const newJenisJabatan = new JenisJabatan({
            title: req.body.title,
            description: req.body.description,
        });
        newJenisJabatan.save().then(jenisJabatan => {
            req.flash('success-message', 'Jenis Jabatan added successfully.');
            res.redirect('/admin/jenis-jabatan');
        });
    },
    editJenisJabatan: (req, res) => {
        const id = req.params.id;
        JenisJabatan.findById(id).then( jabatan => {
            res.render('admin/jenis-jabatan/edit', {jabatan:jabatan});
        });
    },
    submitEditJenisJabatan: (req, res) => {
        JenisJabatan.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, useFindAndModify: false}, (err, doc) =>{
            if(!err){
                req.flash('success-message', 'Jenis Jabatan edited successfully.');
                res.redirect('/admin/jenis-jabatan')
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    deleteJenisJabatan: (req, res) => {
        JenisJabatan.findByIdAndRemove(req.params.id, (err, doc) => {
            if(!err){
                res.redirect('/admin/jenis-jabatan');
            }else{
                console.log('error during delete record : '+ err);
            }
        });
    },
}
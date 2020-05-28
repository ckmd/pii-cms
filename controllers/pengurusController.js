const Pengurus = require('../models/pengurusModel').Pengurus;
const {isEmpty} = require('../config/customFunction');

module.exports = {
    getPengurus : (req, res) => {
        Pengurus.find().then( pengurus => {
            res.render('admin/pengurus/index', {pengurus : pengurus});
        });
    },
    submitPengurus: (req, res) => {
        let filename = '';
        if(!isEmpty(req.files.uploadedFile)){
            let file = req.files.uploadedFile;
            filename = file.name;
            let uploadDir = './public/uploads/pengurus/';
            
            file.mv(uploadDir + filename, (err) =>{
                if(err)
                    throw err;
            });
        }
        const newPengurus = new Pengurus({
            nama: req.body.nama,
            deskripsi: req.body.deskripsi,
            jabatan: req.body.jabatan,
            urutanPengurus: req.body.urutanPengurus,
            file: `/uploads/pengurus/${filename}`,
        });
        newPengurus.save().then(pengurus => {
            req.flash('success-message', 'Pengurus added successfully.');
            res.redirect('/admin/pengurus');
        });
    },
    createPengurus : (req, res) => {
        // Category.find().then(cats => {
            res.render('admin/pengurus/create');
        // });
    },
    editPengurus: (req, res) => {
        const id = req.params.id;
        Pengurus.findById(id).then( pengurus => {
            // Category.find().then( cats => {
                res.render('admin/pengurus/edit', {pengurus : pengurus});
            // });
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
}
const Pengurus = require('../models/pengurusModel').Pengurus;
const JenisJabatan = require('../models/jenisJabatanModel').JenisJabatan;
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
    // Janis Jabatan Pengurus
    getJenisJabatan: (req, res) => {
        JenisJabatan.find().then(jenisJabatans => {
            res.render('admin/jenis-jabatan/index', {jenisJabatans:jenisJabatans});
        });
    },
    createJenisJabatan:(req, res)=>{
        var namaJabatan = req.body.namaJabatan;
        console.log(namaJabatan)
        if(namaJabatan){
            const newJenisJabatan = new JenisJabatan({
                title: namaJabatan
            });
            newJenisJabatan.save().then(jenisJabatan =>{
                res.status(200).json(jenisJabatan);
            });
        }
    },
    editJenisJabatanGetRoute: async(req, res) => {
        const jabId = req.params.id;
        const jenisJabatans = await JenisJabatan.find();
        JenisJabatan.findById(jabId).then( selected => {
            res.render('admin/jenis-jabatan/edit', {selected:selected, jenisJabatans:jenisJabatans})
        });
    },
    editJenisJabatanPostRoute: (req, res) => {
        const jabId = req.params.id;
        const newJabatan = req.body.jenisJabatan;
        if(newJabatan){
            JenisJabatan.findById(jabId).then(jenisJabatan => {
                jenisJabatan.title = newJabatan;
                jenisJabatan.save().then( updated => {
                    res.status(200).json({url:'/admin/jenis-jabatan'});
                });
            });
        }
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
const Pengurus = require('../models/pengurusModel').Pengurus;
const JenisJabatan = require('../models/jenisJabatanModel').JenisJabatan;
const Cabang = require('../models/cabangModel').Cabang;
const Wilayah = require('../models/wilayahModel').Wilayah;
const Kejuruan = require('../models/kejuruanModel').Kejuruan;
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
        req.body.slug = req.body.title.replace(" ?","").replace(/\s+/g, '-').toLowerCase();
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
    // Cabang / pengurus-cabang
    getCabang: (req, res) => {
        Cabang.find().then(cabangs => {
            res.render('admin/pengurus-cabang/index', {cabangs:cabangs});
        });
    },
    createCabang : (req, res) => {
        res.render('admin/pengurus-cabang/create');
    },
    submitCabang:(req, res)=>{
        let cabangPicture;
        let filename = '';
        if(!isEmpty(req.files)){
            if(!isEmpty(req.files.uploadedFile)){
                let file = req.files.uploadedFile;
                filename = file.name;
                let uploadDir = './public/uploads/cabang/';
                
                file.mv(uploadDir + filename, (err) =>{
                    if(err)
                        throw err;
                });
                cabangPicture = `/uploads/cabang/${filename}`;
            }
        }
        // if empty, use default profile picture
        else{
            cabangPicture = '/uploads/default-cabang-picture.png';
        }
        const newCabang = new Cabang({
            title: req.body.title,
            description: req.body.description,
            file: cabangPicture,
        });
        newCabang.save().then(jenisJabatan => {
            req.flash('success-message', 'Cabang added successfully.');
            res.redirect('/admin/pengurus-cabang');
        });
    },
    editCabang: (req, res) => {
        const id = req.params.id;
        Cabang.findById(id).then( cabang => {
            res.render('admin/pengurus-cabang/edit', {cabang:cabang});
        });
    },
    submitEditCabang: (req, res) => {
        let filename = '';
        if(!isEmpty(req.files)){
            if(!isEmpty(req.files.uploadedFile)){
                let file = req.files.uploadedFile;
                filename = file.name;
                let uploadDir = './public/uploads/cabang/';
            
                file.mv(uploadDir + filename, (err) =>{
                    if(err)
                        throw err;
                });
                req.body.file = `/uploads/cabang/${filename}`;
            }else{
                const id = req.params.id;
                Cabang.findById(id).then( cabang => {
                    req.body.file = cabang.file;
                });
            }
        }
        req.body.slug = req.body.title.replace(" ?","").replace(/\s+/g, '-').toLowerCase();
        Cabang.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, useFindAndModify: false}, (err, doc) =>{
            if(!err){
                req.flash('success-message', 'Cabang edited successfully.');
                res.redirect('/admin/pengurus-cabang')
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    deleteCabang: (req, res) => {
        Cabang.findByIdAndRemove(req.params.id, (err, doc) => {
            if(!err){
                res.redirect('/admin/pengurus-cabang');
            }else{
                console.log('error during delete record : '+ err);
            }
        });
    },
    // Wilayah / pengurus-wilayah
    getWilayah: (req, res) => {
        Wilayah.find().then(wilayahs => {
            res.render('admin/pengurus-wilayah/index', {wilayahs:wilayahs});
        });
    },
    createWilayah : (req, res) => {
        res.render('admin/pengurus-wilayah/create');
    },
    submitWilayah:(req, res)=>{
        let wilayahPicture;
        let filename = '';
        if(!isEmpty(req.files)){
            if(!isEmpty(req.files.uploadedFile)){
                let file = req.files.uploadedFile;
                filename = file.name;
                let uploadDir = './public/uploads/wilayah/';
                
                file.mv(uploadDir + filename, (err) =>{
                    if(err)
                        throw err;
                });
                wilayahPicture = `/uploads/wilayah/${filename}`;
            }
        }
        // if empty, use default profile picture
        else{
            wilayahPicture = '/uploads/default-wilayah-picture.png';
        }
        const newWilayah = new Wilayah({
            title: req.body.title,
            description: req.body.description,
            file: wilayahPicture,
        });
        newWilayah.save().then(wilayah => {
            req.flash('success-message', 'Wilayah added successfully.');
            res.redirect('/admin/pengurus-wilayah');
        });
    },
    editWilayah: (req, res) => {
        const id = req.params.id;
        Wilayah.findById(id).then( wilayah => {
            res.render('admin/pengurus-wilayah/edit', {wilayah:wilayah});
        });
    },
    submitEditWilayah: (req, res) => {
        let filename = '';
        if(!isEmpty(req.files)){
            if(!isEmpty(req.files.uploadedFile)){
                let file = req.files.uploadedFile;
                filename = file.name;
                let uploadDir = './public/uploads/wilayah/';
            
                file.mv(uploadDir + filename, (err) =>{
                    if(err)
                        throw err;
                });
                req.body.file = `/uploads/wilayah/${filename}`;
            }else{
                const id = req.params.id;
                Wilayah.findById(id).then( wilayah => {
                    req.body.file = wilayah.file;
                });
            }
        }
        req.body.slug = req.body.title.replace(" ?","").replace(/\s+/g, '-').toLowerCase();
        Wilayah.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, useFindAndModify: false}, (err, doc) =>{
            if(!err){
                req.flash('success-message', 'Wilayah edited successfully.');
                res.redirect('/admin/pengurus-wilayah')
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    deleteWilayah: (req, res) => {
        Wilayah.findByIdAndRemove(req.params.id, (err, doc) => {
            if(!err){
                res.redirect('/admin/pengurus-wilayah');
            }else{
                console.log('error during delete record : '+ err);
            }
        });
    },
    // Kejuruan / badan-kejuruan
    getKejuruan: (req, res) => {
        Kejuruan.find().then(kejuruans => {
            res.render('admin/badan-kejuruan/index', {kejuruans:kejuruans});
        });
    },
    createKejuruan : (req, res) => {
        res.render('admin/badan-kejuruan/create');
    },
    submitKejuruan:(req, res)=>{
        let kejuruanPicture;
        let filename = '';
        if(!isEmpty(req.files)){
            if(!isEmpty(req.files.uploadedFile)){
                let file = req.files.uploadedFile;
                filename = file.name;
                let uploadDir = './public/uploads/kejuruan/';
                
                file.mv(uploadDir + filename, (err) =>{
                    if(err)
                        throw err;
                });
                kejuruanPicture = `/uploads/kejuruan/${filename}`;
            }
        }
        // if empty, use default profile picture
        else{
            kejuruanPicture = '/uploads/default-kejuruan-picture.png';
        }
        const newKejuruan = new Kejuruan({
            title: req.body.title,
            description: req.body.description,
            file: kejuruanPicture,
        });
        newKejuruan.save().then(kejuruan => {
            req.flash('success-message', 'Badan Kejuruan added successfully.');
            res.redirect('/admin/badan-kejuruan');
        });
    },
    editKejuruan: (req, res) => {
        const id = req.params.id;
        Kejuruan.findById(id).then( kejuruan => {
            res.render('admin/badan-kejuruan/edit', {kejuruan:kejuruan});
        });
    },
    submitEditKejuruan: (req, res) => {
        let filename = '';
        if(!isEmpty(req.files)){
            if(!isEmpty(req.files.uploadedFile)){
                let file = req.files.uploadedFile;
                filename = file.name;
                let uploadDir = './public/uploads/kejuruan/';
            
                file.mv(uploadDir + filename, (err) =>{
                    if(err)
                        throw err;
                });
                req.body.file = `/uploads/kejuruan/${filename}`;
            }else{
                const id = req.params.id;
                Kejuruan.findById(id).then( kejuruan => {
                    req.body.file = kejuruan.file;
                });
            }
        }
        req.body.slug = req.body.title.replace(" ?","").replace(/\s+/g, '-').toLowerCase();
        Kejuruan.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, useFindAndModify: false}, (err, doc) =>{
            if(!err){
                req.flash('success-message', 'Badan Kejuruan edited successfully.');
                res.redirect('/admin/badan-kejuruan')
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    deleteKejuruan: (req, res) => {
        Kejuruan.findByIdAndRemove(req.params.id, (err, doc) => {
            if(!err){
                res.redirect('/admin/badan-kejuruan');
            }else{
                console.log('error during delete record : '+ err);
            }
        });
    },
}
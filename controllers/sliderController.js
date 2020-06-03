const Slider = require('../models/sliderModel').Slider;
const {isEmpty} = require('../config/customFunction');

module.exports = {
    // Slider Top Controller
    getSliderTop: (req, res) => {
        Slider.find({position:'top'}).sort({slideke:'ascending'}).then(sliders => {
            res.render('admin/slider-top/index', {sliders:sliders});
        });
    },
    createSliderTop : (req, res) => {
        res.render('admin/slider-top/create');
    },
    submitSliderTop: (req, res) => {
        let filename = '';
        if(!isEmpty(req.files)){
            let file = req.files.uploadedFile;
            filename = file.name;
            let uploadDir = './public/uploads/';
            
            file.mv(uploadDir + filename, (err) =>{
                if(err)
                    throw err;
            });
        }
        const newSlider = new Slider({
            slideke: req.body.slideke,
            title: req.body.title,
            position: 'top',
            file: `/uploads/${filename}`,
        });
        newSlider.save().then(post => {
            req.flash('success-message', 'Slider created successfully.');
            res.redirect('/admin/slider-top');
        });
    },
    editSliderTop: (req, res) => {
        const id = req.params.id;
        Slider.findById(id).then( slider => {
            res.render('admin/slider-top/edit', {slider : slider});
        });
    },
    submitEditSliderTop: (req, res) => {
        let filename = '';
        if(!isEmpty(req.files)){
            let file = req.files.uploadedFile;
            filename = file.name;
            let uploadDir = './public/uploads/';
        
            file.mv(uploadDir + filename, (err) =>{
                if(err)
                    throw err;
            });
            req.body.file = `/uploads/${filename}`;
        }else{
            const id = req.params.id;
            Slider.findById(id).then( slider => {
                req.body.file = slider.file;
            });
        }
        Slider.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, useFindAndModify: false}, (err, doc) =>{
            if(!err){
                req.flash('success-message', 'Slider edited successfully.');
                res.redirect('/admin/slider-top')
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    deleteSliderTop: (req, res) => {
        Slider.findByIdAndRemove(req.params.id, (err, doc) => {
            if(!err){
                res.redirect('/admin/slider-top');
            }else{
                console.log('error during delete record : '+ err);
            }
        });
    },
        // Slider Controller
    getSlider: (req, res) => {
        Slider.find({position:'bottom'}).sort({slideke:'ascending'}).then(sliders => {
            res.render('admin/slider/index', {sliders:sliders});
        });
    },
    createSlider : (req, res) => {
        res.render('admin/slider/create');
    },
    submitSlider: (req, res) => {
        let filename = '';
        if(!isEmpty(req.files)){
            let file = req.files.uploadedFile;
            filename = file.name;
            let uploadDir = './public/uploads/';
            
            file.mv(uploadDir + filename, (err) =>{
                if(err)
                    throw err;
            });
        }
        const newSlider = new Slider({
            slideke: req.body.slideke,
            title: req.body.title,
            position: 'bottom',
            file: `/uploads/${filename}`,
        });
        newSlider.save().then(post => {
            req.flash('success-message', 'Slider created successfully.');
            res.redirect('/admin/slider');
        });
    },
    editSlider: (req, res) => {
        const id = req.params.id;
        Slider.findById(id).then( slider => {
            res.render('admin/slider/edit', {slider : slider});
        });
    },
    submitEditSlider: (req, res) => {
        let filename = '';
        if(!isEmpty(req.files)){
            let file = req.files.uploadedFile;
            filename = file.name;
            let uploadDir = './public/uploads/';
        
            file.mv(uploadDir + filename, (err) =>{
                if(err)
                    throw err;
            });
            req.body.file = `/uploads/${filename}`;
        }else{
            const id = req.params.id;
            Slider.findById(id).then( slider => {
                req.body.file = slider.file;
            });
        }
        Slider.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, useFindAndModify: false}, (err, doc) =>{
            if(!err){
                req.flash('success-message', 'Slider edited successfully.');
                res.redirect('/admin/slider')
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    deleteSlider: (req, res) => {
        Slider.findByIdAndRemove(req.params.id, (err, doc) => {
            if(!err){
                res.redirect('/admin/slider');
            }else{
                console.log('error during delete record : '+ err);
            }
        });
    },
}
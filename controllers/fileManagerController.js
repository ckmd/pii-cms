const fs = require('fs');
const Post = require('../models/postModel').Post;
const Slider = require('../models/sliderModel').Slider;
const {isEmpty} = require('../config/customFunction');

module.exports = {
    upload : (req,res) => {
        const images = fs.readdirSync('public/uploads')
        var sorted = []
        for (let item of images){
            if(item.split('.').pop() === 'png'
            || item.split('.').pop() === 'jpg'
            || item.split('.').pop() === 'jpeg'
            || item.split('.').pop() === 'svg'){
                var abc = {
                      "image" : "/uploads/"+item,
                      "folder" : '/'
                }
                sorted.push(abc)
            }
        }
        res.send(sorted);    
    },
    newUpload: (req, res) => {
        let filename = '';
        if(!isEmpty(req.files.uploadedFile)){
            let file = req.files.uploadedFile;
            filename = file.name;
            let uploadDir = './public/uploads/';
            
            file.mv(uploadDir + filename, (err) =>{
                if(err) throw err;
            });
            req.flash('success-message', filename+' uploaded successfully.');
        }
        res.redirect('/admin/fileManager');
    },
    loadFiles : (req,res) => {
        const files = fs.readdirSync('public/uploads');
        let pics = files;
        let pdf = files;
        let xlsx = files;
        pics = pics.filter(item => (item.split('.').pop().toLowerCase() == 'png' || item.split('.').pop().toLowerCase() == 'jpg' || item.split('.').pop().toLowerCase() == 'jpeg'));
        pdf = pdf.filter(item => (item.split('.').pop().toLowerCase() == 'pdf'));
        xlsx = xlsx.filter(item => (item.split('.').pop().toLowerCase() == 'xlsx'));
        console.log(pics, pics.length);
        console.log(pdf, pdf.length);
        console.log(xlsx, xlsx.length);
        res.render('admin/fileManager/index',{images:pics, excels:xlsx, pdfs:pdf});
    },
    deleteFile : async(req,res) => {
        const postImage = '/uploads/'+ req.params.name;
        const post = await Post.find({file:postImage});
        const sponsor1 = await Post.find({sponsor1:postImage});
        const sponsor2 = await Post.find({sponsor2:postImage});
        const slider = await Slider.find({file:postImage});
        if((post.length + slider.length + sponsor1.length + sponsor2.length) == 0){
            fs.unlink('./public'+postImage, function (err) {
                if (err) throw err;
            });
            req.flash('success-message', 'Image Deleted successfully.');
        }else{
            req.flash('error-message', "Can't delete image, because Still Used in Post / Sponsor / Slider");
        }
        res.redirect('/admin/fileManager')
    },
}
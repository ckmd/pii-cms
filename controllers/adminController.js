const Post = require('../models/postModel').Post;
const Category = require('../models/categoryModel').Category;
const Slider = require('../models/sliderModel').Slider;
const {isEmpty} = require('../config/customFunction');
global.sidebarlimit = 3;
global.tipesidebarpost = 'populer';

function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}
function convertToBool(status){
    if(status == 'on'){
        return true;
    }else{
        return false;
    }
}

module.exports = {
    index : (req,res) => {
        res.render('admin/index');
    },
    getPosts : (req, res) => {
        Post.find().populate('category').then( posts => {
            res.render('admin/posts/index', {posts : posts});
        });
    },
    submitPosts: (req, res) => {
        let filename = '';
        let tempsponsor1 = '';
        let tempsponsor2 = '';
        if(!isEmpty(req.files.uploadedFile)){
            let file = req.files.uploadedFile;
            filename = file.name;
            let uploadDir = './public/uploads/';
            
            file.mv(uploadDir + filename, (err) =>{
                if(err)
                    throw err;
            });
        }
        if(!isEmpty(req.files.sponsor1)){
            let sp1 = req.files.sponsor1;
            sponsor1name = sp1.name;
            let sp1Dir = './public/uploads/';
            
            sp1.mv(sp1Dir + sponsor1name, (err) =>{
                if(err)
                    throw err;
            });
            tempsponsor1 = `/uploads/${sponsor1name}`;
        }
        if(!isEmpty(req.files.sponsor2)){
            let sp2 = req.files.sponsor2;
            sponsor2name = sp2.name;
            let sp2Dir = './public/uploads/';
            
            sp2.mv(sp2Dir + sponsor2name, (err) =>{
                if(err)
                    throw err;
            });
            tempsponsor2 = `/uploads/${sponsor2name}`;
        }
        const videoId = getId(req.body.videoLink);
        const banner = convertToBool(req.body.setAsBanner);
        const rubix = convertToBool(req.body.setAsRubix);
        const newPost = new Post({
            title: req.body.title,
            introText: req.body.introText,
            description: req.body.description,
            author: req.body.author,
            setAsBanner: banner,
            setAsRubix: rubix,
            status: req.body.status,
            sponsor1: tempsponsor1,
            sponsor2: tempsponsor2,
            videoLink: 'https://www.youtube.com/embed/' + videoId,
            file: `/uploads/${filename}`,
            category: req.body.category
        });
        newPost.save().then(post => {
            req.flash('success-message', 'Post created successfully.');
            res.redirect('/admin/posts');
        });
    },
    createPosts : (req, res) => {
        Category.find().then(cats => {
            res.render('admin/posts/create', {categories:cats});
        });
    },
    editPost: (req, res) => {
        const id = req.params.id;
        Post.findById(id).then( post => {
            Category.find().then( cats => {
                res.render('admin/posts/edit', {post : post, categories:cats});
            });
        });
    },
    submitEditPost: (req, res) => {
        let filename = '';
        if(!isEmpty(req.files)){
            if(!isEmpty(req.files.uploadedFile)){
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
                Post.findById(id).then( post => {
                    req.body.file = post.file;
                });
            }
            if(!isEmpty(req.files.sponsor1)){
                let sp1 = req.files.sponsor1;
                sponsor1name = sp1.name;
                let sp1Dir = './public/uploads/';
                
                sp1.mv(sp1Dir + sponsor1name, (err) =>{
                    if(err)
                        throw err;
                });
                req.body.sponsor1 = `/uploads/${sponsor1name}`;
            }else{
                const id = req.params.id;
                Post.findById(id).then( post => {
                    req.body.sponsor1 = post.sponsor1;
                });
            }
            if(!isEmpty(req.files.sponsor2)){
                let sp2 = req.files.sponsor2;
                sponsor2name = sp2.name;
                let sp2Dir = './public/uploads/';
                
                sp2.mv(sp2Dir + sponsor2name, (err) =>{
                    if(err)
                        throw err;
                });
                req.body.sponsor2 = `/uploads/${sponsor2name}`;
            }
        }else{
            const id = req.params.id;
            Post.findById(id).then( post => {
                req.body.sponsor2 = post.sponsor2;
            });
        }
        req.body.setAsBanner = convertToBool(req.body.setAsBanner);
        req.body.setAsRubix = convertToBool(req.body.setAsRubix);
        req.body.slug = req.body.title.replace(" ?","").replace(/\s+/g, '-').toLowerCase();

        Post.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, useFindAndModify: false}, (err, doc) =>{
            if(!err){
                req.flash('success-message', 'Post edited successfully.');
                res.redirect('/admin/posts')
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    deletePost: (req, res) => {
        Post.findByIdAndRemove(req.params.id, (err, doc) => {
            if(!err){
                res.redirect('/admin/posts');
            }else{
                console.log('error during delete record : '+ err);
            }
        });
    },
    logout: (req, res) => {
        console.log('log out !');
        req.logout();
        res.redirect('/');
    },
    getCategories: (req, res) => {
        Category.find().then(cats => {
            res.render('admin/category/index', {categories:cats});
        });
    },
    createCategories:(req, res)=>{
        var categoryName = req.body.name;
        if(categoryName){
            const newCategory = new Category({
                title: categoryName
            });
            newCategory.save().then(category =>{
                res.status(200).json(category);
            });
        }
    },
    editCategoriesGetRoute: async(req, res) => {
        const catId = req.params.id;
        const cats = await Category.find();
        Category.findById(catId).then( cat => {
            res.render('admin/category/edit', {category:cat, categories:cats})
        });
    },
    editCategoriesPostRoute: (req, res) => {
        const catId = req.params.id;
        const newTitle = req.body.name;
        if(newTitle){
            Category.findById(catId).then(category => {
                category.title = newTitle;
                category.save().then( updated => {
                    res.status(200).json({url:'/admin/category'});
                });
            });
        }
    },
    deleteCategory: (req, res) => {
        Category.findByIdAndRemove(req.params.id, (err, doc) => {
            if(!err){
                res.redirect('/admin/category');
            }else{
                console.log('error during delete record : '+ err);
            }
        });
    },

    // Slider Controller
    getSlider: (req, res) => {
        Slider.find().sort({slideke:'ascending'}).then(sliders => {
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
// Sidebar Customizer
    getSidebar: (req, res) => {
        Post.find({}).populate('category').sort({views:'descending'}).limit(sidebarlimit).then(popular => {
            Post.find({}).populate('category').sort({creationDate:'descending'}).limit(sidebarlimit).then(recent =>{
                if(tipesidebarpost == 'recent'){
                    res.render('admin/sidebar/index', {posts:recent, lim:sidebarlimit, tipe:'baru'});
                } else{
                    res.render('admin/sidebar/index', {posts:popular, lim:sidebarlimit, tipe:tipesidebarpost});
                }
            });
        });
    },
    postSidebar:(req, res)=>{
        const lim = parseInt(req.body.banyakSidebar);
        sidebarlimit = lim;
        Post.find({}).sort({views:'descending'}).limit(sidebarlimit).then(popular => {
            Post.find({}).sort({creationDate:'descending'}).limit(sidebarlimit).then(recent =>{
                if(tipesidebarpost == 'recent'){
                    res.render('admin/sidebar/index', {posts:recent, lim:sidebarlimit, tipe:tipesidebarpost});
                } else{
                    res.render('admin/sidebar/index', {posts:popular, lim:sidebarlimit, tipe:tipesidebarpost});
                }
            });
        });
    },
    editSidebarTypePostRoute:(req, res) => {
        tipesidebarpost = req.body.name;
        Post.find({}).sort({views:'descending'}).limit(sidebarlimit).then(popular => {
            Post.find({}).sort({creationDate:'descending'}).limit(sidebarlimit).then(recent =>{
                if(tipesidebarpost == 'recent'){
                    res.render('admin/sidebar/index', {posts:recent, lim:sidebarlimit, tipe:tipesidebarpost});
                } else{
                    res.render('admin/sidebar/index', {posts:popular, lim:sidebarlimit, tipe:tipesidebarpost});
                }
            });
        });
    },
    getRubix: (req, res) => {
        Post.find({setAsRubix:true}).populate('category').then(posts => {
            res.render('admin/rubix/index', {posts:posts});
        });
    },
    getBanner: (req, res) => {
        Post.find({setAsBanner:true}).populate('category').then(posts => {
            res.render('admin/banner/index', {posts:posts});
        });
    },

}
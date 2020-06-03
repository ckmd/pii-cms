const Post = require('../models/postModel').Post;
const User = require('../models/userModel').User;
const Slider = require('../models/sliderModel').Slider;
const Popup = require('../models/popupModel').Popup;
const Pengurus = require('../models/pengurusModel').Pengurus;
const JenisJabatan = require('../models/jenisJabatanModel').JenisJabatan;
const bcrypt = require('bcryptjs');

module.exports = {
    index : async(req,res) => {
        const popp = await Popup.findOne();
        const banner = await Post.find({setAsBanner:true}).sort({bannerPosition:'ascending'});
        const dirlink = ["program-profesi-insinyur/info", "sertifikasi/mengapa-perlu-sertifikasi","registrasi/mengapa-perlu-stri"];
        const rubix = await Post.find({setAsRubix:true}).populate('category');
        const maxban = banner.length - 1;
        var cars_indicator = [];
        for(i = 0; i <banner.length; i++){
            for(j = 0; j <colban; j++){
            cars_indicator.push(i);}
        }
        const slidersTop = await Slider.find({position:'top'}).sort({slideke:'ascending'});
        Slider.find({position:'bottom'}).sort({slideke:'ascending'}).then(sliders => {
            res.render('default/index', {
                slidersTop: slidersTop, 
                sliders: sliders, 
                rubix:rubix, 
                banner:banner, 
                dirlink:dirlink, 
                cars_indicator:cars_indicator,
                col:colban,
                colmin1:colban-1,
                maxban:maxban,
                popp:popp
            });
        });
    },
    infoall : async(req,res) => {
        const posts = await Post.find({status:'Info'});
        res.render('default/infoall', {posts: posts});
    },
    info : async(req,res) => {
        const post = await Post.findOne({status:'Info',slug:req.params.slug});
        post.views = post.views + 1;
        // create navbar post
        const popular = await Post.find({}).populate('category').sort({views:'descending'}).limit(sidebarlimit);
        const recent = await Post.find({}).populate('category').sort({creationDate:'descending'}).limit(sidebarlimit);
        var sidebarposts = '';
        if(tipesidebarpost == 'recent'){
            sidebarposts = recent;
        } else{
            sidebarposts = popular;
        }
        const banner = await Post.find({setAsBanner:true});
        // update views
        Post.findOneAndUpdate({_id: post._id}, post, {new: true, useFindAndModify: false}, (err, doc) =>{
            if(!err){
                res.render('default/info', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    artikelall : async(req,res) => {
        const posts = await Post.find({status:'Artikel'});
        res.render('default/artikelall', {posts: posts});
    },
    artikel : async(req,res) => {
        const post = await Post.findOne({status:'Artikel',slug:req.params.slug});
        post.views = post.views + 1;
        const popular = await Post.find({}).populate('category').sort({views:'descending'}).limit(sidebarlimit);
        const recent = await Post.find({}).populate('category').sort({creationDate:'descending'}).limit(sidebarlimit);
        var sidebarposts = '';
        if(tipesidebarpost == 'recent'){
            sidebarposts = recent;
        } else{
            sidebarposts = popular;
        }
        const banner = await Post.find({setAsBanner:true});
        Post.findOneAndUpdate({_id: post._id}, post, {new: true, useFindAndModify: false}, (err, doc) =>{
            if(!err){
                res.render('default/artikel', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    newsall : async(req,res) => {
        const posts = await Post.find({status:'News'});
        res.render('default/newsall', {posts: posts});
    },
    news : async(req,res) => {
        const post = await Post.findOne({status:'News',slug:req.params.slug});
        post.views = post.views + 1;
        const popular = await Post.find({}).populate('category').sort({views:'descending'}).limit(sidebarlimit);
        const recent = await Post.find({}).populate('category').sort({creationDate:'descending'}).limit(sidebarlimit);
        var sidebarposts = '';
        if(tipesidebarpost == 'recent'){
            sidebarposts = recent;
        } else{
            sidebarposts = popular;
        }
        const banner = await Post.find({setAsBanner:true});
        Post.findOneAndUpdate({_id: post._id}, post, {new: true, useFindAndModify: false}, (err, doc) =>{
            if(!err){
                res.render('default/news', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    videoall : async(req,res) => {
        const posts = await Post.find({status:'Video'}).populate('category');
        res.render('default/videoall', {posts: posts});
    },
    video : async(req,res) => {
        const post = await Post.findOne({status:'Video',slug:req.params.slug});
        post.views = post.views + 1;
        const popular = await Post.find({}).populate('category').sort({views:'descending'}).limit(sidebarlimit);
        const recent = await Post.find({}).populate('category').sort({creationDate:'descending'}).limit(sidebarlimit);
        var sidebarposts = '';
        if(tipesidebarpost == 'recent'){
            sidebarposts = recent;
        } else{
            sidebarposts = popular;
        }
        const banner = await Post.find({setAsBanner:true});
        Post.findOneAndUpdate({_id: post._id}, post, {new: true, useFindAndModify: false}, (err, doc) =>{
            if(!err){
                res.render('default/video', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    search : async(req,res) => {
        const searchQue = req.body.query.split(" ");
        const qq = [];
        for(let i = 0; i < searchQue.length; i++){
            qq[i] = {title: { $regex: '.*' + searchQue[i] + '.*', $options:'i' }};
        }
        const searchRes = await Post.find({ $or:qq}).populate('category');
        res.render('default/searchresult', {posts: searchRes, que:req.body.query});
    },
    pengurus : async(req,res) => {
        const slug = req.params.slug;
        let punyaKetua = false;
        const jenisJabatan = await JenisJabatan.findOne({slug:slug});
        const jenid = jenisJabatan.id;
        const pengurus = await Pengurus.find({jenisJabatan:jenid}).sort({urutanPengurus:'ascending'});
        const daftarKetua = ["pengurus-pusat", "dewan-penasehat", "ceips", "forum-insinyur-muda", "forum-perempuan-insinyur", "majelis-kehormatan-etik", "majelis-standard-keinsinyuran"];
        for(let i = 0; i < daftarKetua.length ; i++){
            if(slug == daftarKetua[i])
                punyaKetua = true;
        }
        res.render('default/struktur-organisasi', {pengurus: pengurus, jenisJabatan:jenisJabatan, punyaKetua:punyaKetua});
    },
    loginGet: (req, res) => {
        res.render('default/login');
    },
    loginPost: (req, res) => {
        res.send('successfully login');
    },
    registerGet: (req, res) => {
        res.render('default/register');
    },
    registerPost: (req, res) => {
        let errors = [];
        if(!req.body.firstName){
            errors.push({message: 'First name is mandatory'});
        }
        if(!req.body.lastName){
            errors.push({message: 'Last name is mandatory'});
        }
        if(!req.body.email){
            errors.push({message: 'Email is mandatory'});
        }
        if(req.body.password !== req.body.passwordConfirm){
            errors.push({message: 'passwords do not match'});
        }
        console.log(req.body);

        if(errors.length > 0){
            res.render('default/register', {
                errors: errors,
                firstName: req.body.firstName,
                lastName:req.body.lastName,
                email: req.body.email
            });
        }else{
            User.findOne({email:req.body.email}).then(user =>{
                if(user){
                    req.flash('error-message', 'Email already registered, try to login.');
                    res.redirect('/login');
                }else{
                    const newUser = new User(req.body);
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash;
                            newUser.save().then( user => {
                                req.flash('success-message', 'you are now registered.');
                                res.redirect('/login');
                            });
                        });
                    });
                }
            });
        }
    },
}
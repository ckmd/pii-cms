const Post = require('../models/postModel').Post;
const User = require('../models/userModel').User;
const bcrypt = require('bcryptjs');

module.exports = {
    index : async(req,res) => {
        // const posts = await Post.find();
        const posts = await Post.find({status:'Draft'});
        res.render('default/index', {posts: posts});
    },
    infoall : async(req,res) => {
        const posts = await Post.find({status:'Info'});
        res.render('default/infoall', {posts: posts});
    },
    info : async(req,res) => {
        Post.findOne({slug:req.params.slug}).then( post => {
            res.render('default/info', {post : post});
        });
    },
    artikelall : async(req,res) => {
        const posts = await Post.find({status:'Artikel'});
        res.render('default/artikelall', {posts: posts});
    },
    artikel : async(req,res) => {
        const id = req.params.id;
        Post.findById(id).then( post => {
            res.render('default/artikel', {post : post});
        });
    },
    newsall : async(req,res) => {
        const posts = await Post.find({status:'News'});
        res.render('default/newsall', {posts: posts});
    },
    news : async(req,res) => {
        const id = req.params.id;
        Post.findById(id).then( post => {
            res.render('default/news', {post : post});
        });
    },
    videoall : async(req,res) => {
        const posts = await Post.find({status:'Video'});
        res.render('default/videoall', {posts: posts});
    },
    video : async(req,res) => {
        const id = req.params.id;
        Post.findById(id).then( post => {
            res.render('default/video', {post : post});
        });
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
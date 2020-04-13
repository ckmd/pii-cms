const Post = require('../models/postModel').Post;

module.exports = {
    index : async(req,res) => {
        // const posts = await Post.find();
        const posts = await Post.find({status:'Draft'});
        res.render('default/index', {posts: posts});
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
        res.send('successfully registered');
    },
}
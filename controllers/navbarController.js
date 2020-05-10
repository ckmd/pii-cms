const Post = require('../models/postModel').Post;
const User = require('../models/userModel').User;
const Slider = require('../models/sliderModel').Slider;
const bcrypt = require('bcryptjs');

module.exports = {
    infoall : async(req,res) => {
        const posts = await Post.find({status:'Info'});
        res.render('default/infoall', {posts: posts});
    },
    keanggotaan : async(req,res) => {
        const post = await Post.findOne({slug:req.params.slug});
        post.views = post.views + 1;
        // create navbar post
        const popular = await Post.find({}).sort({views:'descending'}).limit(sidebarlimit);
        const recent = await Post.find({}).sort({creationDate:'descending'}).limit(sidebarlimit);
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
                res.render('default/keanggotaan', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    registrasi : async(req,res) => {
        const post = await Post.findOne({slug:req.params.slug});
        post.views = post.views + 1;
        // create navbar post
        const popular = await Post.find({}).sort({views:'descending'}).limit(sidebarlimit);
        const recent = await Post.find({}).sort({creationDate:'descending'}).limit(sidebarlimit);
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
                res.render('default/registrasi', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    sertifikasi : async(req,res) => {
        const post = await Post.findOne({slug:req.params.slug});
        post.views = post.views + 1;
        // create navbar post
        const popular = await Post.find({}).sort({views:'descending'}).limit(sidebarlimit);
        const recent = await Post.find({}).sort({creationDate:'descending'}).limit(sidebarlimit);
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
                res.render('default/sertifikasi', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
}
const Post = require('../models/postModel').Post;
const {isEmpty} = require('../config/customFunction');

module.exports = {
    index : (req,res) => {
        res.render('admin/index');
    },
    getPosts : (req, res) => {
        Post.find().then( posts => {
            res.render('admin/posts/index', {posts : posts});
        });
    },
    submitPosts: (req, res) => {
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
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            file: `/uploads/${filename}`
        });
        newPost.save().then(post => {
            req.flash('success-message', 'Post created successfully.');
            res.redirect('/admin/posts');
        });
    },
    createPosts : (req, res) => {
        res.render('admin/posts/create');
    },
    editPost: (req, res) => {
        const id = req.params.id;
        Post.findById(id).then( post => {
            res.render('admin/posts/edit', {post : post});
        });
    },
    submitEditPost: (req, res) => {
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
    }
}
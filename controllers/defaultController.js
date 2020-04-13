const Post = require('../models/postModel').Post;

module.exports = {
    index : async(req,res) => {
        const posts = await Post.find();
        res.render('default/index', {posts: posts});
    },
}
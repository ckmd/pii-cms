const Post = require('../models/postModel').Post;

module.exports = {
    keanggotaan : async(req,res) => {
        const post = await Post.findOne({status:'Keanggotaan',slug:req.params.slug});
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
        const post = await Post.findOne({status:'Registrasi',slug:req.params.slug});
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
        const post = await Post.findOne({status:'Sertifikasi',slug:req.params.slug});
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
    getPII : async(req,res) => {
        const post = await Post.findOne({status:'PII',slug:req.params.slug});
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
                res.render('default/pii', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    getPPI : async(req,res) => {
        const post = await Post.findOne({status:'Program-Profesi-Insinyur',slug:req.params.slug});
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
                res.render('default/ppi', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    getAnnualReport : async(req,res) => {
        const posts = await Post.find({status:'Annual-Report'});
        res.render('default/publikasi/annual-report-all', {posts: posts});
    },
    getEachAnnualReport : async(req,res) => {
        const post = await Post.findOne({status:'Annual-Report',slug:req.params.slug});
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
                res.render('default/publikasi/annual-report', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    getAdditionalReport : async(req,res) => {
        const posts = await Post.find({status:'Additional-Report'});
        res.render('default/publikasi/additional-report-all', {posts: posts});
    },
    getEachAdditionalReport : async(req,res) => {
        const post = await Post.findOne({status:'Additional-Report',slug:req.params.slug});
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
                res.render('default/publikasi/additional-report', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    getJurnal : async(req,res) => {
        const posts = await Post.find({status:'Jurnal'});
        res.render('default/publikasi/jurnal-all', {posts: posts});
    },
    getEachJurnal : async(req,res) => {
        const post = await Post.findOne({status:'Jurnal',slug:req.params.slug});
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
                res.render('default/publikasi/jurnal', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    getBursaKerja : async(req,res) => {
        const posts = await Post.find({status:'Bursa-Kerja'});
        res.render('default/publikasi/bursa-kerja-all', {posts: posts});
    },
    getEachBursaKerja : async(req,res) => {
        const post = await Post.findOne({status:'Bursa-Kerja',slug:req.params.slug});
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
                res.render('default/publikasi/bursa-kerja', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    getProjectService : async(req,res) => {
        const posts = await Post.find({status:'Project-and-Service'});
        res.render('default/publikasi/project-service-all', {posts: posts});
    },
    getEachProjectService : async(req,res) => {
        const post = await Post.findOne({status:'Project-and-Service',slug:req.params.slug});
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
                res.render('default/publikasi/project-service', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    getGallery : async(req,res) => {
        const posts = await Post.find({status:'Gallery'});
        res.render('default/publikasi/gallery-all', {posts: posts});
    },
    getEachGallery : async(req,res) => {
        const post = await Post.findOne({status:'Gallery',slug:req.params.slug});
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
                res.render('default/publikasi/gallery', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    getEventsEngineerRoom : async(req,res) => {
        const posts = await Post.find({status:'Events-engineer-room'});
        res.render('default/events/engineer-room', {posts: posts});
    },
    getEachEventsEngineerRoom : async(req,res) => {
        const post = await Post.findOne({status:'Events-engineer-room',slug:req.params.slug.toLowerCase()});
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
                res.render('default/events/details', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    getEventsWebinar : async(req,res) => {
        const posts = await Post.find({status:'Events-webinar'});
        res.render('default/events/webinar', {posts: posts});
    },
    getEachEventsWebinar : async(req,res) => {
        const post = await Post.findOne({status:'Events-webinar',slug:req.params.slug.toLowerCase()});
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
                res.render('default/events/details', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
    getEventsFgd : async(req,res) => {
        const posts = await Post.find({status:'Events-fgd'});
        res.render('default/events/fgd', {posts: posts});
    },
    getEachEventsFgd : async(req,res) => {
        const post = await Post.findOne({status:'Events-fgd',slug:req.params.slug.toLowerCase()});
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
                res.render('default/events/details', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },    
    getEventsOthers : async(req,res) => {
        const posts = await Post.find({status:'Events-others'});
        res.render('default/events/others', {posts: posts});
    },
    getEachEventsOthers : async(req,res) => {
        const post = await Post.findOne({status:'Events-others',slug:req.params.slug.toLowerCase()});
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
                res.render('default/events/details', {post : post, sidebarposts:sidebarposts, sidebarBanner:banner});
            }else{
                console.log('error during record update : '+err);
            }
        });
    },
}
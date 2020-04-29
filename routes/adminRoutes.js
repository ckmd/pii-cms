const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {isUserAuthenticated} = require('../config/customFunction');

router.all('/*', isUserAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});
router.route('/').get(adminController.index);
router.route('/posts')
    .get(adminController.getPosts);

router.route('/posts/create')
    .get(adminController.createPosts)
    .post(adminController.submitPosts);

router.route('/posts/edit/:id')
    .get(adminController.editPost)
    .post(adminController.submitEditPost);

router.route('/posts/delete/:id')
    .get(adminController.deletePost);

router.route('/logout')
    .get(adminController.logout);

router.route('/category')
    .get(adminController.getCategories)
    .post(adminController.createCategories);

router.route('/category/edit/:id')
    .get(adminController.editCategoriesGetRoute)
    .post(adminController.editCategoriesPostRoute);

router.route('/category/delete/:id')
    .get(adminController.deleteCategory);

    // Slider routes
router.route('/slider')
    .get(adminController.getSlider);

router.route('/slider/create')
    .get(adminController.createSlider)
    .post(adminController.submitSlider);

router.route('/slider/edit/:id')
    .get(adminController.editSlider)
    .post(adminController.submitEditSlider);

router.route('/slider/delete/:id')
    .get(adminController.deleteSlider);

// custom sidebar routes
router.route('/sidebar')
    .get(adminController.getSidebar);

module.exports = router;
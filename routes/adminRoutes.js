const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const sliderController = require('../controllers/sliderController');
const pengurusController = require('../controllers/pengurusController');
const {isUserAuthenticated} = require('../config/customFunction');
const fileManagerController = require('../controllers/fileManagerController');

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

    // Slider Top routes
router.route('/slider-top')
    .get(sliderController.getSliderTop);

router.route('/slider-top/create')
    .get(sliderController.createSliderTop)
    .post(sliderController.submitSliderTop);

router.route('/slider-top/edit/:id')
    .get(sliderController.editSliderTop)
    .post(sliderController.submitEditSliderTop);

router.route('/slider-top/delete/:id')
    .get(sliderController.deleteSliderTop);

    // Slider Quotes routes
router.route('/slider')
    .get(sliderController.getSlider);

router.route('/slider/create')
    .get(sliderController.createSlider)
    .post(sliderController.submitSlider);

router.route('/slider/edit/:id')
    .get(sliderController.editSlider)
    .post(sliderController.submitEditSlider);

router.route('/slider/delete/:id')
    .get(sliderController.deleteSlider);

// custom sidebar routes
router.route('/sidebar')
    .get(adminController.getSidebar)
    .post(adminController.postSidebar);

router.route('/sidebar/edit')
    .post(adminController.editSidebarTypePostRoute);

router.route('/rubix')
    .get(adminController.getRubix);

router.route('/banner')
    .get(adminController.getBanner)
    .post(adminController.postBanner);

router.route('/popup')
    .get(adminController.getPopup)
    .post(adminController.postPopup);

router.route('/files')
    .get(fileManagerController.upload);

router.route('/fileManager/upload')
    .post(fileManagerController.newUpload);

router.route('/fileManager')
    .get(fileManagerController.loadFiles);

router.route('/delete-fileManager/:name')
    .get(fileManagerController.deleteFile);

// Pengurus
router.route('/pengurus')
    .get(pengurusController.getPengurus);

router.route('/pengurus/create')
    .get(pengurusController.createPengurus)
    .post(pengurusController.submitPengurus);

router.route('/pengurus/edit/:id')
    .get(pengurusController.editPengurus)
    .post(pengurusController.submitEditPengurus);

router.route('/pengurus/delete/:id')
    .get(pengurusController.deletePengurus);
// jabatan pengurus
router.route('/jenis-jabatan')
    .get(pengurusController.getJenisJabatan);

router.route('/jenis-jabatan/create')
    .get(pengurusController.createJenisJabatan)
    .post(pengurusController.submitJenisJabatan);

router.route('/jenis-jabatan/edit/:id')
    .get(pengurusController.editJenisJabatan)
    .post(pengurusController.submitEditJenisJabatan);

router.route('/jenis-jabatan/delete/:id')
    .get(pengurusController.deleteJenisJabatan);

module.exports = router;
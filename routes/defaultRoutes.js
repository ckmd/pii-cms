const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');
const navbarController = require('../controllers/navbarController');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/userModel').User;

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'default';
    next();
});

router.route('/')
    .get(defaultController.index);
// Navbar routing
router.route('/keanggotaan/:slug')
    .get(navbarController.keanggotaan);

router.route('/registrasi/:slug')
    .get(navbarController.registrasi);

router.route('/sertifikasi/:slug')
    .get(navbarController.sertifikasi);

// Navbar 2 routing
router.route('/pii/:slug')
    .get(navbarController.getPII);

router.route('/program-profesi-insinyur/:slug')
    .get(navbarController.getPPI);

router.route('/Annual-Report')
    .get(navbarController.getAnnualReport);

router.route('/Annual-Report/:slug')
    .get(navbarController.getEachAnnualReport);

router.route('/Additional-Report')
    .get(navbarController.getAdditionalReport);

router.route('/Additional-Report/:slug')
    .get(navbarController.getEachAdditionalReport);

router.route('/Jurnal')
    .get(navbarController.getJurnal);

router.route('/Jurnal/:slug')
    .get(navbarController.getEachJurnal);

router.route('/Bursa-Kerja/')
    .get(navbarController.getBursaKerja);

router.route('/Bursa-Kerja/:slug')
    .get(navbarController.getEachBursaKerja);

router.route('/Project-and-Service')
    .get(navbarController.getProjectService);

router.route('/Project-and-Service/:slug')
    .get(navbarController.getEachProjectService);

router.route('/Gallery')
    .get(navbarController.getGallery);

router.route('/Gallery/:slug')
    .get(navbarController.getEachGallery);

router.route('/Events')
    .get(navbarController.getEvents);

router.route('/Events/:slug')
    .get(navbarController.getEachEvents);

    // default routing
router.route('/info')
    .get(defaultController.infoall);

router.route('/info/:slug')
    .get(defaultController.info);

router.route('/artikel')
    .get(defaultController.artikelall);

router.route('/artikel/:slug')
    .get(defaultController.artikel);

router.route('/news')
    .get(defaultController.newsall);

router.route('/news/:slug')
    .get(defaultController.news);

router.route('/video')
    .get(defaultController.videoall);

router.route('/video/:slug')
    .get(defaultController.video);

router.route('/search')
    .post(defaultController.search);

router.route('/struktur-organisasi/:slug')
    .get(defaultController.pengurus);

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({email: email}).then( user => {
        if(!user){
            return done(null, false, req.flash('error-message', 'User not found with this email.'));
        }
        bcrypt.compare(password, user.password, (err, passwordMatched) => {
            if(err){
                return err;
            }
            if(!passwordMatched){
                return done(null, false, req.flash('error-message', 'invalid username or password.'));
            }
            return done(null, user, req.flash('success-message', 'Login Successfull'));
        });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

router.route('/login')
    .get(defaultController.loginGet)
    .post(passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: true,
        session: true
    }), defaultController.loginPost);

router.route('/register')
    .get(defaultController.registerGet)
    .post(defaultController.registerPost);

module.exports = router;
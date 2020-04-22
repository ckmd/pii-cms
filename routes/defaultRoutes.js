const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');
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

router.route('/info')
    .get(defaultController.infoall);

router.route('/info/:id')
    .get(defaultController.info);

router.route('/artikel')
    .get(defaultController.artikelall);

router.route('/artikel/:id')
    .get(defaultController.artikel);

router.route('/news')
    .get(defaultController.newsall);

router.route('/news/:id')
    .get(defaultController.news);

router.route('/video')
    .get(defaultController.videoall);

router.route('/video/:id')
    .get(defaultController.video);

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
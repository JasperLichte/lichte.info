const express           = require('express');
const passport          = require('passport');
const passportSetup     = require('./../login/passport-setup');

const mainController    = require('./controller/mainController');
const authController    = require('./controller/authController');
const appController     = require('./controller/appController');
const apiController     = require('./controller/apiController');
const errorController   = require('./controller/errorController');

const router            = express.Router();

// Main
router.route('/').get(mainController.getLogin);
router.route('/login').get(mainController.getLogin);
router.route('/logout').get(mainController.getLogout);
router.route('/about').get(mainController.getAbout);

// Auth
router.route('/auth').get(mainController.getLogin);
router.route('/auth/google').get(authController.getGoogle);
router.route('/auth/google/redirect').get(passport.authenticate('google'), authController.getGoogleRedirect);
router.route('/auth/facebook').get(authController.getFacebook);
router.route('/auth/github').get(authController.getGitHub);
router.route('/auth/*').get(mainController.getLogin);

// App
router.route('/dashboard').get(appController.getDashboard);

// API
router.route('/api/todo').get(apiController.getTodo);
router.route('/api/todo').post(apiController.postTodo);

// 404
router.route('*').get(errorController.get404);

module.exports = router;
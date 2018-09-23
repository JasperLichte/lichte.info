const express = require('express');
const mainController = require('./controller/mainController');
const authController = require('./controller/authController');
const errorController = require('./controller/errorController');

const router = express.Router();

// Main
router.route('/').get(mainController.getMain);
router.route('/login').get(mainController.getLogin);
router.route('/about').get(mainController.getAbout);

// Auth
router.route('/auth').get(mainController.getLogin);
router.route('/auth/google').get(authController.getGoogle);
router.route('/auth/facebook').get(authController.getFacebook);
router.route('/auth/github').get(authController.getGitHub);
router.route('/auth/*').get(mainController.getLogin);

// 404
router.route('*').get(errorController.get404);

module.exports = router;
var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');// authorization

const passport = require('passport');

/* Require controller modules. */
const user_controller = require('../controllers/userController');

/* Require service modules. */
const homepage_service= require('../services/homepageService.js');
const book_service= require('../services/bookService.js');
const user_service= require('../services/userService.js');

/* -------------- USER AUTHENTICATION -------------- */

/* GET login page. */
router.get('/login', user_controller.user_login_get);

/* POST request to login and authenticate user. */
router.post('/login', passport.authenticate('local', { failureRedirect: '/' }), user_controller.user_login_post);

/* GET registration page. */
router.get('/register', user_controller.user_register_get);

/* POST request to register user. */
router.post('/register', user_controller.user_register_post);

/* POST request to logout user. */
router.get('/logout', user_controller.user_logout_get);


/* -------------- AFTER AUTHENTICATION -------------- */

/* GET profile settings page. */
router.get('/settings', user_controller.user_profile_settings_get);

/* GET dashboard after login. */
router.get('/dashboard', connectEnsureLogin.ensureLoggedIn('/user/login'), book_service.book_count, user_controller.dashboard_get);

/* GET message inbox. */
router.get('/all_messages', user_service.message_count, user_controller.view_messages);

/* POST update for individual message. */
// router.post('/all_messages', user_controller.message_detail_post);

/* GET individual message. */
router.get('/message/:id', user_service.message_count, user_controller.message_detail);

module.exports = router;

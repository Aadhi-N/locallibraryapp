var express = require('express');
var router = express.Router();
const passport = require('passport');
const authentication_controller = require('../controllers/authenticationController');

/* GET request to login user. */
router.get('/', authentication_controller.index);

/* POST request to login and authenticate user. */
router.post('/', authentication_controller.user_login_post);

/* GET request for registration page. */
router.get('/register', authentication_controller.user_register_get);

/* POST request to register user. */
router.post('/register', authentication_controller.user_register_post);

/* GET dashboard after login. */
router.get('/dashboard', authentication_controller.dashboard_get);




module.exports = router;

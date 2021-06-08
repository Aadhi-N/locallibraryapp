var express = require('express');
var router = express.Router();
const passport = require('passport');
const authentication_controller = require('../controllers/authenticationController');
const user_controller = require('../controllers/userController');

/* GET request to login user. */
router.get('/', authentication_controller.index);

/* POST request to login and authenticate user. */
router.post('/', authentication_controller.user_login_post);

/* GET request for registration page. */
router.get('/register', authentication_controller.user_register_get);

/* POST request to register user. */
router.post('/register', authentication_controller.user_register_post);

/* POST request to logout user. */
router.get('/logout', authentication_controller.user_logout_get);

/* GET request to login admin. */
router.get('/admin', authentication_controller.admin_index);



module.exports = router;

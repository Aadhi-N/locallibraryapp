var express = require('express');
var router = express.Router();
const user_controller = require('../controllers/userController');


/* GET profile settings page. */
router.get('/settings', user_controller.user_profile_settings_get);


module.exports = router;

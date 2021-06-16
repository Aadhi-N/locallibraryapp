var express = require('express');
var router = express.Router();
const passport = require('passport');
require('../middleware/passport');


const user_controller = require('../controllers/userController');
const homepage_service= require('../services/homepageService.js');



/* GET profile settings page. */
router.get('/settings', user_controller.user_profile_settings_get);

/* GET dashboard after login. */
router.get('/dashboard', passport.authenticate('jwt', {session: false}), homepage_service.book_count, user_controller.dashboard_get);

/* GET message inbox. */
router.get('/all_messages', user_controller.view_messages);

/* POST update for individual message. */
router.post('/all_messages', user_controller.message_detail_post);

/* GET individual message. */
router.get('/message/:id', user_controller.message_detail);

module.exports = router;

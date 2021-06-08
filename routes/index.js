var express = require('express');
var router = express.Router();
const homepage_controller = require('../controllers/homepageController.js');
const homepage_service= require('../services/homepageService.js');



/* GET home page. */
router.get('/home', function(req, res, next) {
  res.redirect('/catalog');
});

/* POST test. */
router.post('/', homepage_controller.delete_cookies);

/* GET home page. */
router.get('/', homepage_service.book_count, homepage_controller.index);

/* GET About page. */
router.get('/about', homepage_controller.about_get);


/* GET Contact page. */
router.get('/contact', homepage_controller.contact_get);



module.exports = router;

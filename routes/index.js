var express = require('express');
var router = express.Router();
const homepage_controller = require('../controllers/homepageController.js');


/* GET home page. */
router.get('/home', function(req, res, next) {
  res.redirect('/catalog');
});

/* GET home page. */
router.get('/', homepage_controller.index);

/* GET About page. */
router.get('/about', homepage_controller.about_get);

/* GET Contact page. */
router.get('/contact', homepage_controller.contact_get);



module.exports = router;

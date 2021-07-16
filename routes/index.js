var express = require('express');
var router = express.Router();

/* Require controller modules. */
const homepage_controller = require('../controllers/homepageController.js');

/* Require service modules. */
const book_service = require('../services/bookService.js');
const homepage_service= require('../services/homepageService.js');

/* Global variables middleware */
const middleware = require('../middleware/globalVariables.js');
router.use(middleware.globalLocals);

/* GET home page. */
router.get('/', homepage_service.featured_book, book_service.book_count, homepage_controller.index);

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.redirect('/');
});

/* GET About page. */
router.get('/about', homepage_controller.about_get);

/* GET Contact page. */
router.get('/contact', homepage_controller.contact_get);

// POST request for Contact page messages.
router.post('/contact', homepage_controller.message_create_post);


module.exports = router;

var express = require('express');
var router = express.Router();
const homepage_controller = require('../controllers/homepageController.js');


/* GET home page. */
router.get('/home', function(req, res, next) {
  res.redirect('/catalog');
});

/* GET home page. */
router.get('/', homepage_controller.index);

module.exports = router;

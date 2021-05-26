var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.redirect('/catalog');
});

/* GET login page. */
router.get('/', function(req, res, next) {
  res.redirect('/login')
})
module.exports = router;

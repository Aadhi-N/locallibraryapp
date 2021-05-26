var express = require('express');
var router = express.Router();
const authentication_controller = require('../controllers/authenticationController');

/* GET login home page. */
router.get('/', authentication_controller.index);


module.exports = router;

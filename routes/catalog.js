var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login'); 

/* Require controller modules. */
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');
var book_instance_controller = require('../controllers/bookinstanceController');

/* Require service modules. */
const catalog_service= require('../services/catalogService.js');
const book_service = require('../services/bookService.js');

/* Global variables */
const middleware = require('../middleware/globalVariables.js');
router.use(middleware.globalLocals);

/* SET GLOBAL VARIABLES FOR ROUTE. */
router.get('/', book_service.book_count);


/* -------- BOOK ROUTES --------- */

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/book/create', connectEnsureLogin.ensureLoggedIn('/user/login'), book_controller.book_create_get);

// POST request for creating Book.
router.post('/book/create', connectEnsureLogin.ensureLoggedIn('/user/login'), book_controller.book_create_post);

// GET request to delete Book.
router.get('/book/:id/delete', connectEnsureLogin.ensureLoggedIn('/user/login'), book_controller.book_delete_get);

// POST request to delete Book.
router.post('/book/:id/delete', connectEnsureLogin.ensureLoggedIn('/user/login'), book_controller.book_delete_post);

// GET request to update Book.
router.get('/book/:id/update', connectEnsureLogin.ensureLoggedIn('/user/login'), book_controller.book_update_get);

// POST request to update Book.
router.post('/book/:id/update', connectEnsureLogin.ensureLoggedIn('/user/login'), book_controller.book_update_post);

// GET request for one Book.
router.get('/book/:id', book_service.book_count, book_service.book_detail, book_controller.book_detail);

// GET request for list of all Book items.
router.get('/books', catalog_service.book_list, book_controller.book_list_get);

/* -------- AUTHOR ROUTES --------- */

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/author/create', connectEnsureLogin.ensureLoggedIn('/user/login'), author_controller.author_create_get);

// POST request for creating Author.
router.post('/author/create', connectEnsureLogin.ensureLoggedIn('/user/login'), author_controller.author_create_post);

// GET request to delete Author.
router.get('/author/:id/delete', connectEnsureLogin.ensureLoggedIn('/user/login'), author_controller.author_delete_get);

// POST request to delete Author.
router.post('/author/:id/delete', connectEnsureLogin.ensureLoggedIn('/user/login'), author_controller.author_delete_post);

// GET request to update Author.
router.get('/author/:id/update', connectEnsureLogin.ensureLoggedIn('/user/login'), author_controller.author_update_get);

// POST request to update Author.
router.post('/author/:id/update', connectEnsureLogin.ensureLoggedIn('/user/login'), author_controller.author_update_post);

// GET request for one Author.
router.get('/author/:id', author_controller.author_detail);

// GET request for list of all Authors.
router.get('/authors', author_controller.author_list);


/* -------- GENRE ROUTES --------- */

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', connectEnsureLogin.ensureLoggedIn('/user/login'), genre_controller.genre_create_get);

//POST request for creating Genre.
router.post('/genre/create', connectEnsureLogin.ensureLoggedIn('/user/login'), genre_controller.genre_create_post);

// GET request to delete Genre.
router.get('/genre/:id/delete', connectEnsureLogin.ensureLoggedIn('/user/login'), genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete', connectEnsureLogin.ensureLoggedIn('/user/login'), genre_controller.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update', connectEnsureLogin.ensureLoggedIn('/user/login'), genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', connectEnsureLogin.ensureLoggedIn('/user/login'), genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list);


/* -------- BOOKINSTANCE ROUTES --------- */

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get('/bookinstance/create', connectEnsureLogin.ensureLoggedIn('/user/login'), book_instance_controller.bookinstance_create_get);

// POST request for creating BookInstance.
router.post('/bookinstance/create', connectEnsureLogin.ensureLoggedIn('/user/login'), book_instance_controller.bookinstance_create_post);

// GET request to delete BookInstance.
router.get('/bookinstance/:id/delete', connectEnsureLogin.ensureLoggedIn('/user/login'), book_instance_controller.bookinstance_delete_get);

// POST request to delete BookInstance.
router.post('/bookinstance/:id/delete', connectEnsureLogin.ensureLoggedIn('/user/login'), book_instance_controller.bookinstance_delete_post);

// GET request to update BookInstance.
router.get('/bookinstance/:id/update', connectEnsureLogin.ensureLoggedIn('/user/login'), book_instance_controller.bookinstance_update_get);

// POST request to update BookInstance.
router.post('/bookinstance/:id/update', connectEnsureLogin.ensureLoggedIn('/user/login'), book_instance_controller.bookinstance_update_post);

// GET request for one BookInstance.
router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);

// GET request for list of all BookInstance.
router.get('/bookinstances', book_instance_controller.bookinstance_list);

module.exports = router;

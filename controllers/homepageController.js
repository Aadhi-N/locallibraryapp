const async = require('async');
const {body, validationResult} = require("express-validator");
const debug = require('debug')('author');
const Book = require('../models/book');
const BookInstance = require('../models/bookinstance');
const Author = require('../models/author');
const Genre = require('../models/genre');

// Display Library Home Page
exports.index = function(req, res, next) {
  async.parallel({
    book_count: function(callback) {
      Book.countDocuments({}).exec(callback);
    },
    book_instance_count: function(callback) {
      BookInstance.countDocuments({}).exec(callback);
    },
    book_instance_available_count: function(callback) {
      BookInstance.countDocuments({status: 'Available'}).exec(callback);
    },
    author_count: function(callback) {
      Author.countDocuments({}).exec(callback);
    },
    genre_count: function(callback) {
      Genre.countDocuments({}).exec(callback);
    },

  }, function(err, results) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('index', { title: 'Hello', book_count: results.book_count, book_instance_count: results.book_instance_count, book_instance_available_count: results.book_instance_available_count, author_count: results.author_count, genre_count: results.genre_count});
    });
};


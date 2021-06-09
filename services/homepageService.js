const async = require('async');

const Book = require('../models/book');
const BookInstance = require('../models/bookinstance');
const Author = require('../models/author');
const Genre = require('../models/genre');

exports.book_count = function(req, res, next) {
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
      // Set data object to local variables
      res.locals.book_count = results;
      next();      
    });
};

exports.headers = function(req, res, next) {
  res.locals.headers = {
    title: 'hello'
  }
  next();
}
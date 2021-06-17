const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

const async = require('async');

/* Get entire library inventory for display in public views. */
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

/* Display detail page for a specific book. */
exports.book_detail = function(req, res, next) {
  async.parallel({
      book: function(callback) {
          Book.findById(req.params.id)
              .populate('author')
              .populate('genre')
              .exec(callback);
      },
      book_instance: function(callback) {
          BookInstance.find({'book': req.params.id})
          .exec(callback)
      }  
  }, function(err, results) {
      if (err) {return next(err);}
      if (results.book == null) { //no results
          var err = new Error('Book not found');
          err.status = 404;
          return next(err);
      } else {
        res.locals.book_detail = results;
      }
      next();
  });
};

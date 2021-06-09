const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

const async = require('async');

// Display detail page for a specific book.
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

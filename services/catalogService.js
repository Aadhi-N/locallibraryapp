const Book = require('../models/book');


exports.book_list = function(req, res, next) {
  Book.find({}, 'title author summary')
  .populate('author')
  .exec(function(err, results) {
      if (err) {return next(err)};
      res.locals.list_books = results;
      next();
  })
};
const async = require('async');

const Book = require('../models/book');

exports.featured_book = function(req, res, next) {
  Book.findById('6080727b38996e407a8a701c')
  .exec(function(err, results) {
      if (err) {return next(err)};
      res.locals.featured_book = results;
      next();
  })
};

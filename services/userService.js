const Message = require('../models/message');

const async = require('async');

// Display detail page for a specific book.
exports.message_count = function(req, res, next) {
  Message.count({ read: false })
  .exec(function(err, results) {
      if (err) {return next(err)};
      res.locals.message_count = results;
      next();
  })
};

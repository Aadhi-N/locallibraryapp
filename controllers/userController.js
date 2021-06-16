const async = require('async');
const debug = require('debug')('message');
const { body, validationResult } = require("express-validator");


const Message = require('../models/message.js');


/* Display user profile settings on GET. */
exports.user_profile_settings_get = function(req, res, next) {
  res.render('user_profile_settings');
}

/* Display Dashboard on GET. */
exports.dashboard_get = function(req, res, next) {
  let locals = res.locals.book_count;
  res.render('dashboard', { 
    welcomeMsg: 'Welcome back', 
    user: req.user, 
    welcomeDesc: "Explore Narnia's largest digital collection of books, media, and more",
    book_count: locals.book_count, 
    book_instance_count: locals.book_instance_count, 
    book_instance_available_count: locals.book_instance_available_count, 
    author_count: locals.author_count, 
    genre_count: locals.genre_count
  });
};

exports.view_messages = function(req, res, next) {
  async.parallel({
    message_count: function(callback) {
      Message.count(
        { 'read': false }
      ).exec(callback);
    },
    message_list: function(callback) {
      Message.find()
      .sort([['timestamp', 'descending']]).exec(callback);
    }
  },  function(err, results) {
        if (err) { 
          debug('messages list error: ' + err);
          return next(err)
        }
        res.render('admin_layout', {message_count: results.message_count, message_list: results.message_list})        
      });
}

/* Display individual message. */
exports.message_detail = function(req, res, next) {
  Message.findById(req.params.id)
    .exec(function(err, message_detail) {
        if(err) {return next(err)};
        res.render('message_detail', {message: message_detail});
    })
  };
  
/* Update message read status on PUT. */
exports.message_detail_post = [
  (req, res, next) => {
    console.log('body', req.body)
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render('message_detail', { errors: errors.array()});
      return;
    } else {
      // Data from form is valid. Update the record.
      Message.findByIdAndUpdate(req.body._id, { read: true }, {new: true}, function (err, message_detail) {
          if (err) { return next(err); }
             // Successful - redirect to genre detail page.
            //  res.redirect(`/message/${message_detail._id}`);
            console.log('HELOOO', message_detail)
          });
      } 
  }
]


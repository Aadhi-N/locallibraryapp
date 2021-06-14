const async = require('async');
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

/* Display Messages inbox. */
exports.view_messages = function(req, res, next) {
  async.parallel({
    message_count: function(callback) {
      Message.countDocuments({}).exec(callback);
    },
    message_list: function(callback) {
      Message.find()
      .sort([['timestamp', 'descending']])
    }
  },  function(err, results) {
        if (err) { return next(err); }
        res.render('admin_layout', {message_count, message_list})        
      });
  // Message.find()
  // .sort([['timestamp', 'descending']])
  // .exec(function(err, list_messages) {
  //   if (err) {
  //     debug('messages list error: ' + err);
  //     return next(err)
  //   };
  //   res.render('admin_layout', {message_list: list_messages});
  // })
}

/* Display individual message. */
exports.message_detail = function(req, res, next) {
  Message.findById(req.params.id)
    .exec(function(err, message_detail) {
        if(err) {return next(err)};
        res.render('message_detail', {message: message_detail});
    })
};


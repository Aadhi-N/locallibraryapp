const {body, validationResult} = require("express-validator");
const Message = require('../models/message.js');
const User = require('../models/user.js');
const Admin = require('../models/admin.js');


// Display Library Home Page
exports.index = function(req, res, next) {
  res.cookie('userId', '1234', {expires: 0});
  let headers = res.locals;
  let count = res.locals.book_count;

  res.render('index', { 
    libTitle: headers.libTitle, 
    welcomeMsg: headers.welcomeMsg,
    welcomeDesc: headers.welcomeDesc,
    featuredBook: headers.featuredBook,
    book_count: count.book_count, 
    book_instance_count: count.book_instance_count, 
    book_instance_available_count: count.book_instance_available_count, 
    author_count: count.author_count, 
    genre_count: count.genre_count
  });
};

/* Display the About page. */
exports.about_get = function(req, res, next) {
  res.render('about');
}

// TEST
exports.delete_cookies = function(req, res, next) {
  res
  .clearCookie('userId')
  .redirect('/about');
}

/* Display the Contact page. */
exports.contact_get = function(req, res, next) {

  Admin.findById('60b7f0a5fd165d866688494c').exec(function(err, adminId) {
    if (err) return err;
    res.render('contact', {adminId: adminId})
  })

  // res.render('contact');
};

/* Handle Message create on post in Contact page. */
exports.message_create_post = [
  // Validate and sanitize fields.
  body('name'),
  body('email').trim().isLength({ min: 1 }).isEmail().escape().withMessage('Email must be specified.'),
  body('message').trim().isLength({ min: 1 }).escape().withMessage('Message must be specified.'),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render('contact', { errors: errors.array() });
      // res.render('contact', {error});

      return;
    } else {
      // Data from form is valid.
      // Create Message object with escaped and trimmed data
      const toId = Admin.findById('60b7f0a5fd165d866688494c', function(err, toId) {
        if (err) return next(err);
        return toId;
      });
      //   if (err) return next(err);
      //   return fromId;
      // })
      // user = 60ae8e75c0c7463856408549
      // const toId = await Admin.findById('60b7f0a5fd165d866688494c', function(err))

      var message = new Message(
        {
          to_id: req.body.to_id,
          subject: `Inquiry Ref ${generateRefNum()} - ${req.body.name} - ${Date.now()}`,
          name: req.body.name,
          email: req.body.email,
          library_card: req.body.library_card,
          message: req.body.message,
          read: false,
          timestamp: Date.now(),
        }
      );

      message.save(function (err) {
          if (err) { 
            console.log('ERRORRRRR', message)
            console.log('to_id field', req.body)
            return next(err); }
          // Successful - redirect to new author record.
          res.redirect('/');
          console.log('to_id field', req.body)
      });
    }
  }
];

function generateRefNum() {
  return '4xy-xx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}



const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Display Login page 
exports.index = function(req, res) {
  res.render('login', { title: 'Login to Library'});
};

/* Handle Login authentication on POST. */
exports.user_login_post = function(req, res, next) {
    passport.authenticate('local', function (err, user, info) { 
      if(err){return next(err)};

      if (!user) {
        console.log('user', user)
        const err = new Error ("username or password incorrect");
        err.status = 404;
        return next(err);
      } else {
        req.login(user, function(err){
          if(err){
            return next(err)
          }else{
            const token =  jwt.sign({userId : user._id, username:user.username}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
            res.render('dashboard', { message: "Authentication successful", token: token });
          }
        })
      }
  })(req, res);
};

/* Display User registration page on GET */
exports.user_register_get = function(req, res, next) {
  res.render('register');
}

/* Handle User registration on POST. */
exports.user_register_post = function(req, res, next) {
  const user = new User({ username: req.body.username });
  User.register(user, req.body.password, function(err, user) {
    if (err) {
      return next(err);
    } else {
      res.render('login', { welcomeMsg: 'Thanks for registering. Please log in.'});
    }
  })
}


// Display Login page after logging out
exports.user_logout_get = function(req, res, next) {
  res.redirect('/login');
};


// Display Dashboard on GET
exports.dashboard_get = function(req, res, next) {
  res.render('dashboard');
};

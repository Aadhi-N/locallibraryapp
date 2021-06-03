const passport = require('passport');
const jwt = require('jsonwebtoken');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');


genToken = user => {
  return jwt.sign({
    iss: 'Joan_Louji',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, process.env.JWT_SECRET);
}


/* Display Login page */
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
        req.login(user, {session: false}, function(err){
          if(err){
            return next(err)
          }else{
            const body = {_id: user._id, username: user.username }
            //sign token
            // Generate JWT token
            const token = genToken(user)
            res
            .set({
              "Set-Cookie": `${token}`,
              "Access-Control-Allow-Credentials": true
            }).redirect('/user/dashboard');
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
      res.render('login', { welcomeMsg: 'Signup successful. Please log in.'});
    }
  })
}


// Display Login page after logging out
exports.user_logout_get = function(req, res, next) {
  res.redirect('/login');
};


/* Display Admin Login page. */
exports.admin_index = function(req, res) {
  res.render('admin_login', { title: 'Admin Login to Library'});
};




const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// const passportJWT = require("passport-jwt");
// const JWTStrategy   = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;


/* Middleware to handle user login. */
passport.use(
  'login',
  new localStrategy(
    {
      username: 'username',
      password: 'password'
    },
    function (username, password, done) {
      try {
        const user = User.findOne({ username });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);



// module.exports = function(passport) {
//   let opts = {};
//   opts.jwtFromRequest = ExtractJWT.fromHeader('cookie');
//   opts.secretOrKey = process.env.JWT_SECRET;

//   passport.use('user-rule', new JWTStrategy( opts, (jwtPayload, done) => {
//     return User.findById(jwtPayload.sub)
//      .then(user => 
//      {
//        return done(null, user);
//      }
//    ).catch(err => 
//    {
//      return done(err);
//    });
//   }
//   ));

//   passport.use('admin-rule', new JWTStrategy( opts, (jwtPayload, done) => {
//     return Admin.findById(jwtPayload.sub)
//      .then(user => 
//      {
//        return done(null, user);
//      }
//    ).catch(err => 
//    {
//      return done(err);
//    });
//   }
//   ));
//}
  
// passport.use(new JWTStrategy({
//     jwtFromRequest: ExtractJWT.fromHeader('cookie'),
//     secretOrKey: process.env.JWT_SECRET
//   },
//    function (jwtPayload, done) {
//      return User.findById(jwtPayload.sub)
//      .then(user => 
//      {
//        return done(null, user);
//      }
//    ).catch(err => 
//    {
//      return done(err);
//    });
//   }
// ));


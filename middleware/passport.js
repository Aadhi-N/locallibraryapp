const passport = require('passport')
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('../models/user');
const Admin = require('../models/admin');


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
  
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromHeader('cookie'),
    secretOrKey: process.env.JWT_SECRET
  },
   function (jwtPayload, done) {
     return User.findById(jwtPayload.sub)
     .then(user => 
     {
       return done(null, user);
     }
   ).catch(err => 
   {
     return done(err);
   });
  }
));


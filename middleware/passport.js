const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

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


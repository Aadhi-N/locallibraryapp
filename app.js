const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');

/* Routers */
const indexRouter = require('./routes/index');
const catalogRouter = require('./routes/catalog');
const userRouter = require('./routes/user');

/* Models */
const User = require('./models/user');


const app = express();

/* Set up mongoose connection */

const dev_db_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wj4yy.mongodb.net/local_library?retryWrites=true&w=majority`;
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* View engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure Sessions Middleware
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));


/* Set up for authorization and authentication - initialize passport.js*/
app.use(passport.initialize());
app.use(passport.session());


/* Define passport local strategy */
// Passport Local Strategy
passport.use(User.createStrategy());

//to use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Other */
app.use(cookieParser());
app.use(compression());

/* Helmet content security policies */
app.use(helmet.contentSecurityPolicy({
  useDefaults: false,
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'","'unsafe-inline'", 'api.mapbox.com', 'unpkg.com'],
    styleSrc: ["'self'","'unsafe-inline'", 'unpkg.com', 'cdn.jsdelivr.net', 
   'fonts.googleapis.com', 'use.fontawesome.com', 'maxcdn.bootstrapcdn.com'],
    scriptSrc: ["'self'","'unsafe-inline'", 'unpkg.com', 'code.jquery.com', 'cdnjs.cloudflare.com', 'stackpath.bootstrapcdn.com', 'cdn.jsdelivr.net', 'ajax.googleapis.com', 'maxcdn.bootstrapcdn.com'],
    }
  })
);

/* Static paths to render assets */
app.use('/', express.static(path.join(__dirname, 'public')));

/* Routes */
app.use('/', indexRouter);
app.use('/catalog', catalogRouter);
app.use('/user', userRouter);


/* Error handlers */
//login error 
app.use(function(req, res, next) {
  // res.status(404).render('login_error', {err: 'Username or password incorrect'});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

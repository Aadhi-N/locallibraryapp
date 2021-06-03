const dotenv = require('dotenv');
dotenv.config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const session = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
// const bodyParser = require('body-parser');


const indexRouter = require('./routes/index');
const catalogRouter = require('./routes/catalog');
const authenticationRouter = require('./routes/authentication');
const userRouter = require('./routes/user');

// const authentication_controller = require('./controllers/authenticationController');

const app = express();

// Set up mongoose connection
const mongoDB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wj4yy.mongodb.net/local_library?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Set up for authorization and authentication - initialize passport.js*/
app.use(passport.initialize());
app.use(passport.session());

/* Send required data using sessions */
app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: false }));

/* Define passport local strategy */
const LocalStrategy = require('passport-local').Strategy;
//User model
const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));

//to use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/catalog', catalogRouter);
app.use('/login', authenticationRouter);
app.use('/user', passport.authenticate('jwt', {session: false}), userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

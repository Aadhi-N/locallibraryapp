

/* Extract JWT from query param, verify token has been signed, pass to next middleware. */


/* Display user profile settings on GET. */
exports.user_profile_settings_get = function(req, res, next) {
  res.render('user_profile_settings');
}

/* Display Dashboard on GET. */
exports.dashboard_get = function(req, res, next) {
  res.render('dashboard', { message: 'you made it to secure route', user: req.user});
};
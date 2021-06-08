

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
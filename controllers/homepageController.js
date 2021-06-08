

// Display Library Home Page
exports.index = function(req, res, next) {
  res.cookie('userId', '1234', {expires: 0});
  let locals = res.locals.book_count;
  res.render('index', { 
    title: 'Narnia Public Library', 
    welcomeMsg: "Welcome to Narnia Public Library",
    welcomeDesc: "Narnia's largest digital collection of books, media, and more",
    featuredBook: "Searching for Home...",
    book_count: locals.book_count, 
    book_instance_count: locals.book_instance_count, 
    book_instance_available_count: locals.book_instance_available_count, 
    author_count: locals.author_count, 
    genre_count: locals.genre_count
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

// /* Display the About page. */
// exports.about_post = function(req, res, next) {
//   res.status(200)
//   .clearCookie('userId', {path: '/login'})
//   .sendStatus(200)
//   .redirect('/about');
// }

/* Display the Contact page. */
exports.contact_get = function(req, res, next) {
  res.render('contact');
};



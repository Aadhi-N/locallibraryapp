

// Display Library Home Page
exports.index = function(req, res, next) {
  res.cookie('userId', '1234', {expires: 0});
  let headers = res.locals;
  let count = res.locals.book_count;

  res.render('index', { 
    libTitle: headers.libTitle, 
    welcomeMsg: headers.welcomeMsg,
    welcomeDesc: headers.welcomeDesc,
    featuredBook: headers.featuredBook,
    book_count: count.book_count, 
    book_instance_count: count.book_instance_count, 
    book_instance_available_count: count.book_instance_available_count, 
    author_count: count.author_count, 
    genre_count: count.genre_count
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



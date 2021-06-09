const middleware = {
  globalLocals: function (req, res, next) {
    res.locals = {
      libTitle: 'Narnia Public Library',
      welcomeMsg: 'Narnia Public Library',
      welcomeDesc: "Narnia's largest digital collection of books, media, and more",
      featuredBook: 'Searching for Home...'
    };
    next();
  }
};

module.exports = middleware;

const middleware = {
  globalLocals: function (req, res, next) {
    res.locals = {
      libTitle: 'Narnia Public Library',
      welcomeMsg: 'Narnia Public Library',
      welcomeDesc: "Narnia's largest digital collection of books, media, and more",
    };
    next();
  },
  // appendLocalsToUseInViews: function(req, res, next) {
  //    //append request and session to use directly in views and avoid passing around needless stuff
  //     // res.locals.request = req;
  //     if(req.user.username !== null)
  //     {
  //         res.locals.user = req.user.username;
  //     }
  //   next();
  // },
};


module.exports = middleware;

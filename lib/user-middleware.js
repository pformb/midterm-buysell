//to displey the header in all views files by creating a middleware
const userMiddleware = (app) => {
  app.use((req, res, next) => {
    if (req.session && req.session.user) {
      req.user = req.session.user;
    } else {
      req.user = null;
    }
    next();
  });

  //pass to all the views
  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });
};

module.exports = userMiddleware

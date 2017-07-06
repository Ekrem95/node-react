var sessions = require('client-sessions');
var User = require('../db/user');

module.exports.userSession = (req, res, next) => {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, (err, user) => {
      if (err) console.log(err);
      if (user) {
        req.user = user;
        delete req.user.password;
        req.session.user = req.user;
        res.locals.user = req.user;
      }

      next();
    });
  }else {
    next();
  }
};

module.exports.sessions = sessions({
  cookieName: process.env.cookieName,
  secret: process.env.secret,
  duration: 60 * 60 * 10000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  //ephemeral: true //delete cookie when browser is closed
});

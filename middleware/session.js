var sessions = require('client-sessions');
const { User } = require('../db');

module.exports.sessions = sessions({
    cookieName: 'session',
    secret: process.env.SECRET || 'secret',
    duration: 60 * 60 * 10000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    //ephemeral: true //delete cookie when browser is closed
});

module.exports.requireLogin = (req, res, next) => {
    if (!req.user) return res.redirect('/login');

    next();
};

module.exports.userSession = async (req, res, next) => {
    if (req.session && req.session.user) {
        const user = await User.findOne({ email: req.session.user.email });

        if (user) {
            req.user = user;
            delete req.user.password;
            req.session.user = req.user;
            res.locals.user = req.user;
        }
    }

    next();
};

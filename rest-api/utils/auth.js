const jwt = require('./jwt');
const models = require('../models');

module.exports = (redirectAuthenticated = true) => {

    return function (req, res, next) {

        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
        jwt.verifyToken(token)
        .then(data => {
            models.User.findById(data.id)
            .then((user) => {
                req.user = user;
                next();
            });
        })
        .catch(err => {
            if (!redirectAuthenticated) { next(); return; }

            if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                res.status(401).send('UNAUTHORIZED!');
                return;
            }

            next(err);
        })
    }

};
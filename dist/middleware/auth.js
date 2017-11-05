'use strict';

module.exports = function (req, res, next) {
    if (!req.session.uid) return next(new Error('User is not signed in'));
    next();
};
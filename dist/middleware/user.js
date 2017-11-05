'use strict';

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, res, next) {
  var uid = req.session.uid;
  if (!uid) return next();
  _user2.default.get(uid, function (err, user) {
    if (err) return next(err);
    req.user = user;
    next();
  });
};
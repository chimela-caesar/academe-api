'use strict';

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.signup = function (req, res, next) {
  var data = req.body;
  _user2.default.getByEmail(data.email, function (err, user) {
    if (user) return next(new Error('Email already exists'));
    user = new _user2.default({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      pass: data.pass
    });
    user.save(function (err) {
      if (err) return next(err);
      req.session.uid = user.id;
      res.json({ message: 'User successfully created' });
    });
  });
};

exports.signin = function (req, res, next) {
  var data = req.body;
  _user2.default.authenticate(data.email, data.pass, function (err, user) {
    if (err) return next(err);
    if (user) {
      req.session.uid = user.id;
      res.json(user);
    } else {
      return next(new Error('Sorry! invalid credentials'));
    }
  });
};

exports.signout = function (req, res) {
  req.session.destroy(function (err) {
    if (err) throw err;
    res.json({ message: 'User successfully signed out' });
  });
};
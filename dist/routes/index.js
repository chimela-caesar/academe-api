'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.notfound = function (req, res, next) {
  res.status(404).json({ message: 'Resource not found' });
};

exports.error = function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
};
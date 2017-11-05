'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _user = require('./middleware/user');

var _user2 = _interopRequireDefault(_user);

var _auth = require('./middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _students = require('./routes/students');

var _students2 = _interopRequireDefault(_students);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use((0, _cookieParser2.default)());
app.use((0, _expressSession2.default)({ secret: 'secret', resave: false, saveUninitialized: true }));

app.use(_user2.default);

// enable cross-origin resource sharing
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.post('/users/signup', _users2.default.signup);
app.post('/users/signin', _users2.default.signin);
app.post('/users/signout', _users2.default.signout);

app.get('/students', _students2.default.all);
app.post('/students', _students2.default.create);
app.get('/students/:id', _students2.default.find);
app.put('/students/:id', _students2.default.update);
app.delete('/students/:id', _students2.default.delete);

// using authentication middleware
/*
app.get('/students', auth, students.all);
app.post('/students', auth, students.create);
app.get('/students/:id', auth, students.find);
app.put('/students/:id', auth, students.update);
app.delete('/students/:id', auth, students.delete);
*/

app.use(_index2.default.notfound);
app.use(_index2.default.error);

module.exports = app;
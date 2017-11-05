'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User(obj) {
    _classCallCheck(this, User);

    for (var key in obj) {
      this[key] = obj[key];
    }
  }

  _createClass(User, [{
    key: 'toJSON',
    value: function toJSON() {
      return {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
      };
    }
  }, {
    key: 'save',
    value: function save(cb) {
      var _this = this;

      if (this.id) {
        this.update(cb);
      } else {
        (0, _config2.default)().then(function () {
          _this.hashPassword(function (err) {
            if (err) return cb(err);
            _config2.default.db('users').insert(_this, 'id').then(function (ids) {
              _this.id = ids[0];
              cb();
            }).catch(function (err) {
              cb(err);
            });
          });
        }).catch(function (err) {
          cb(err);
        });
      }
    }
  }, {
    key: 'update',
    value: function update(cb) {
      var _this2 = this;

      (0, _config2.default)().then(function () {
        _config2.default.db('users').where({ id: _this2.id }).update(_this2).then(function (rows) {
          cb();
        }).catch(function (err) {
          cb(err);
        });
      }).catch(function (err) {
        cb(err);
      });
    }
  }, {
    key: 'hashPassword',
    value: function hashPassword(cb) {
      var _this3 = this;

      _bcrypt2.default.genSalt(12, function (err, salt) {
        if (err) return cb(err);
        _this3.salt = salt;
        _bcrypt2.default.hash(_this3.pass, salt, function (err, hash) {
          if (err) return cb(err);
          _this3.pass = hash;
          cb();
        });
      });
    }
  }], [{
    key: 'getByEmail',
    value: function getByEmail(email, cb) {
      (0, _config2.default)().then(function () {
        _config2.default.db('users').where({ email: email }).first().then(function (user) {
          if (user) return cb(null, new User(user));
          cb();
        }).catch(function (err) {
          cb(err);
        });
      }).catch(function (err) {
        cb(err);
      });
    }
  }, {
    key: 'getId',
    value: function getId(email, cb) {
      getByEmail(email, function (err, user) {
        if (err) return cb(err);
        cb(null, user.id);
      });
    }
  }, {
    key: 'get',
    value: function get(id, cb) {
      (0, _config2.default)().then(function () {
        _config2.default.db('users').where({ id: id }).first().then(function (user) {
          if (user) return cb(null, new User(user));
          cb();
        }).catch(function (err) {
          cb(err);
        });
      }).catch(function (err) {
        cb(err);
      });
    }
  }, {
    key: 'authenticate',
    value: function authenticate(email, pass, cb) {
      User.getByEmail(email, function (err, user) {
        if (err) return cb(err);
        if (!user) return cb();
        _bcrypt2.default.hash(pass, user.salt, function (err, hash) {
          if (err) return cb(err);
          if (hash == user.pass) return cb(null, user);
          cb();
        });
      });
    }
  }]);

  return User;
}();

module.exports = User;
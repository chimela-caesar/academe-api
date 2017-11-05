'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Student = function () {
	function Student(obj) {
		_classCallCheck(this, Student);

		for (var key in obj) {
			this[key] = obj[key];
		}
	}

	_createClass(Student, [{
		key: 'toJSON',
		value: function toJSON() {
			return {
				id: this.id,
				firstName: this.firstName,
				lastName: this.lastName,
				middleName: this.middleName,
				birthDate: this.birthDate,
				gender: this.gender,
				nationality: this.nationality,
				grade: this.grade,
				homeroomTeacher: this.homeroomTeacher,
				address: this.address,
				city: this.city,
				state: this.state,
				zip: this.zip,
				country: this.country,
				phone: this.phone,
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
					_config2.default.db('students').insert(_this, 'id').then(function (ids) {
						_this.id = ids[0];
						cb();
					}).catch(function (err) {
						cb(err);
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
				_config2.default.db('students').where({ id: _this2.id }).update(_this2).then(function (rows) {
					cb();
				}).catch(function (err) {
					cb(err);
				});
			}).catch(function (err) {
				cb(err);
			});
		}
	}], [{
		key: 'delete',
		value: function _delete(id, cb) {
			(0, _config2.default)().then(function () {
				_config2.default.db('students').where({ id: id }).del().then(function (rows) {
					cb();
				}).catch(function (err) {
					cb(err);
				});
			}).catch(function (err) {
				cb(err);
			});
		}
	}, {
		key: 'getAll',
		value: function getAll(cb) {
			(0, _config2.default)().then(function () {
				_config2.default.db('students').orderBy('firstName').then(function (students) {
					if (students) return cb(null, students);
					cb();
				}).catch(function (err) {
					cb(err);
				});
			}).catch(function (err) {
				cb(err);
			});
		}
	}, {
		key: 'get',
		value: function get(id, cb) {
			(0, _config2.default)().then(function () {
				_config2.default.db('students').where({ id: id }).first().then(function (student) {
					if (student) return cb(null, new Student(student));
					cb();
				}).catch(function (err) {
					cb(err);
				});
			}).catch(function (err) {
				cb(err);
			});
		}
	}, {
		key: 'getRange',
		value: function getRange(from, to, cb) {
			(0, _config2.default)().then(function () {
				_config2.default.db('students').limit(to - from).offset(from).orderBy('firstName').then(function (students) {
					if (students) return cb(null, students);
					cb();
				}).catch(function (err) {
					cb(err);
				});
			}).catch(function (err) {
				cb(err);
			});
		}
	}, {
		key: 'count',
		value: function count(cb) {
			(0, _config2.default)().then(function () {
				_config2.default.db('students').count('*').then(function (count) {
					if (count) return cb(null, parseInt(count, 10));
					cb();
				}).catch(function (err) {
					cb(err);
				});
			}).catch(function (err) {
				cb(err);
			});
		}
	}]);

	return Student;
}();

module.exports = Student;
'use strict';

var _student = require('../models/student');

var _student2 = _interopRequireDefault(_student);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.find = function (req, res, next) {
	var id = req.params['id'];
	_student2.default.get(id, function (err, student) {
		if (err) return next(err);
		res.json(student);
	});
};

exports.all = function (req, res, next) {
	_student2.default.getAll(function (err, students) {
		if (err) return next(err);
		res.json(students);
	});
};

exports.create = function (req, res, next) {
	var data = req.body;

	var student = new _student2.default({
		firstName: data.firstName,
		lastName: data.lastName,
		middleName: data.middleName,
		birthDate: data.birthDate,
		gender: data.gender,
		nationality: data.nationality,
		grade: data.grade,
		homeroomTeacher: data.homeroomTeacher,
		address: data.address,
		city: data.city,
		state: data.state,
		zip: data.zip,
		country: data.country,
		phone: data.phone,
		email: data.email,
		guardianName: data.guardianName,
		guardianRelationship: data.guardianRelationship,
		guardianPhone: data.guardianPhone,
		guardianEmail: data.guardianEmail,
		guardianAddress: data.guardianAddress,
		guardianCity: data.guardianCity,
		guardianState: data.guardianState,
		guardianZip: data.guardianZip,
		guardianCountry: data.guardianCountry
	});

	student.save(function (err) {
		if (err) return next(err);
		res.json({ message: 'Student added.' });
	});
};

exports.update = function (req, res, next) {
	var data = req.body;

	var student = new _student2.default({
		id: data.id,
		firstName: data.firstName,
		lastName: data.lastName,
		middleName: data.middleName,
		birthDate: data.birthDate,
		gender: data.gender,
		nationality: data.nationality,
		grade: data.grade,
		homeroomTeacher: data.homeroomTeacher,
		address: data.address,
		city: data.city,
		state: data.state,
		zip: data.zip,
		country: data.country,
		phone: data.phone,
		email: data.email,
		guardianName: data.guardianName,
		guardianRelationship: data.guardianRelationship,
		guardianPhone: data.guardianPhone,
		guardianEmail: data.guardianEmail,
		guardianAddress: data.guardianAddress,
		guardianCity: data.guardianCity,
		guardianState: data.guardianState,
		guardianZip: data.guardianZip,
		guardianCountry: data.guardianCountry
	});

	student.update(function (err) {
		if (err) return next(err);
		res.json({ message: 'Student updated.' });
	});
};

exports.delete = function (req, res, next) {
	var id = req.params['id'];
	_student2.default.delete(id, function (err) {
		if (err) return next(err);
		res.json({ message: 'Student deleted.' });
	});
};
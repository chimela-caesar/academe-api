'use strict';

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = (0, _knex2.default)({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true
	}

});

module.exports = function () {
	return db.schema.createTableIfNotExists('users', function (table) {
		table.increments('id').primary();
		table.string('firstName');
		table.string('lastName');
		table.string('email');
		table.string('pass');
		table.string('salt');
	}).then(function () {
		return db.schema.createTableIfNotExists('students', function (table) {
			table.increments('id').primary();
			table.string('firstName');
			table.string('lastName');
			table.string('middleName');
			table.date('birthDate');
			table.string('gender');
			table.string('nationality');
			table.string('grade');
			table.string('homeroomTeacher');
			table.string('address');
			table.string('city');
			table.string('state');
			table.string('zip');
			table.string('country');
			table.string('phone');
			table.string('email');
			table.string('guardianName');
			table.string('guardianRelationship');
			table.string('guardianPhone');
			table.string('guardianEmail');
			table.string('guardianAddress');
			table.string('guardianCity');
			table.string('guardianState');
			table.string('guardianZip');
			table.string('guardianCountry');
		});
	});
};

module.exports.db = db;
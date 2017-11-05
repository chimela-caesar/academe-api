import knex from 'knex';

const db = knex({
	client: 'pg',
	connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }

});

module.exports = () => {
	return db.schema.createTableIfNotExists('users', table => {
		table.increments('id').primary();
		table.string('firstName');
		table.string('lastName');
		table.string('email');
		table.string('pass');
		table.string('salt');
	})
		.then(() => {
			return db.schema.createTableIfNotExists('students', table => {
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

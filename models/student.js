'use strict';
import config from './config';

class Student {
	constructor(obj) {
		for (let key in obj) {
			this[key] = obj[key];
		}
	}

	toJSON() {
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

	save(cb) {
		if (this.id) {
			this.update(cb);
		} else {
			config().then(() => {
				config.db('students').insert(this, 'id').then(ids => {
					this.id = ids[0];
					cb();
				}).catch((err) => {
					cb(err);
				});
			})
				.catch((err) => { cb(err) });
		}
	}

	update(cb) {
		config().then(() => {
			config.db('students').where({ id: this.id }).update(this).then(rows => {
				cb();
			}).catch((err) => {
				cb(err);
			});
		})
			.catch((err) => { cb(err) });
	}

	static delete(id, cb) {
		config().then(() => {
			config.db('students').where({ id }).del().then(rows => {
				cb();
			}).catch((err) => {
				cb(err);
			});
		})
			.catch((err) => { cb(err) });
	}

	static getAll(cb) {
		config().then(() => {
			config.db('students').orderBy('firstName').then((students) => {
				if (students) return cb(null, students);
				cb();
			}).catch((err) => {
				cb(err);
			});
		})
			.catch((err) => { cb(err) });
	}

	static get(id, cb) {
		config().then(() => {
			config.db('students').where({ id }).first().then((student) => {
				if (student) return cb(null, new Student(student));
				cb();
			}).catch((err) => {
				cb(err);
			});
		})
			.catch((err) => { cb(err) });
	}

	static getRange(from, to, cb) {
		config().then(() => {
			config.db('students').limit(to - from).offset(from).orderBy('firstName').then((students) => {
				if (students) return cb(null, students);
				cb();
			}).catch((err) => {
				cb(err);
			});
		})
			.catch((err) => { cb(err) });
	}

	static count(cb) {
		config().then(() => {
			config.db('students').count('*').then((count) => {
				if (count) return cb(null, parseInt(count, 10));
				cb();
			}).catch((err) => {
				cb(err);
			});
		})
			.catch((err) => { cb(err) });
	}
}

module.exports = Student;

import Student from '../models/student';

exports.find = (req, res, next) => {
	const id = req.params['id'];
	Student.get(id, (err, student) => {
		if (err) return next(err);
		res.json(student);
	});
};

exports.all = (req, res, next) => {
	Student.getAll((err, students) => {
		if (err) return next(err);
		res.json(students);
	});
};

exports.create = (req, res, next) => {
	const data = req.body;

	const student = new Student({
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

	student.save((err) => {
		if (err) return next(err);
		res.json({ message: 'Student added.' });
	});
};

exports.update = (req, res, next) => {
	const data = req.body;

	const student = new Student({
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

	student.update((err) => {
		if (err) return next(err);
		res.json({ message: 'Student updated.' });
	});
};

exports.delete = (req, res, next) => {
	const id = req.params['id'];
	Student.delete(id, (err) => {
		if (err) return next(err);
		res.json({ message: 'Student deleted.' });
	});
};

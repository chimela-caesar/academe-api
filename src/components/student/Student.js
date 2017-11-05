import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';

function Student(props) {
	const { student } = props;
	return student
		?
		<tr className="studentData">
			<td><Link to={`/students/${student.id}`}>{student.id}</Link></td>
			<td><Link to={`/students/${student.id}`}>{`${student.firstName} ${student.lastName}`}</Link></td>
			<td><Link to={`/students/${student.id}`}>{student.gender}</Link></td>
			<td><Link to={`/students/${student.id}`}>{student.grade}</Link></td>
			<td><Link to={`/students/${student.id}`}>{student.homeroomTeacher}</Link></td>
		</tr>
		: null;
}

Student.propTypes = {
	student: PropTypes.object
};

export default Student;

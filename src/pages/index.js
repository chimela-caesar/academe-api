import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Student from '../components/student/Student';
import { getStudents } from '../actions/students';

class Home extends Component {
    componentDidMount() {
        this.props.actions.getStudents();
    }
    render() {
        return (
            <div className="home">
                <div className="row">
                    <div className="col-md-4">
                        &nbsp;
                    </div>
                    <div className="col-md-8"><h2>Students</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        &nbsp;
                    </div>
                    <div className="col-md-8">
                        <Link to={'/newstudent'}>
                            <button className="btn btn-warning btn-lg buttons">Add Student</button>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        &nbsp;
                    </div>
                    <div className="col-md-8">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Student</th>
                                        <th>Gender</th>
                                        <th>Grade</th>
                                        <th>Homeroom Teacher</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.students &&
                                        this.props.studentIds.map(studentId => {
                                            return (
                                                <Student
                                                    key={studentId}
                                                    student={this.props.students[studentId]}
                                                />
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    students: PropTypes.object,
    studentIds: PropTypes.arrayOf(PropTypes.number)
};

const HomeContainer = connect(
    // mapStateToProps
    state => {
        return {
            students: state.students,
            studentIds: state.studentIds,
            loading: state.loading
        };
    },
    dispatch => {
        return {
            actions: bindActionCreators({ getStudents }, dispatch)
        };
    }
)(Home);

export default HomeContainer;

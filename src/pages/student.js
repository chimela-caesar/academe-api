import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getStudent, createNewStudent, updateStudent, deleteStudent } from '../actions/students';
import StudentForm from '../components/student/StudentForm';

class SingleStudent extends Component {
    static propTypes = {
        params: PropTypes.shape({
            student: PropTypes.string
        })
    };

    componentDidMount() {
        // If there's no student already loaded, load it
        if (!this.props.student && this.props.router.params.student) {
            const id = parseInt(this.props.router.params.student, 10);
            this.props.actions.getStudent(id);
        }
    }

    render() {
        return (
            <StudentForm
                student={this.props.student}
                router={this.props.router}
                actions={this.props.actions}
            />
        );
    }
}

export default connect(
    // mapStateToProps
    (state, ownProps) => {
        const id = parseInt(ownProps.router.params.student, 10);
        return {
            student: state.students[id]
        };
    },
    dispatch => {
        return {
            actions: bindActionCreators({ getStudent, createNewStudent, updateStudent, deleteStudent }, dispatch)
        };
    }
)(SingleStudent);

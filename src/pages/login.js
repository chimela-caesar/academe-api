import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from '../actions/user';
import LoginForm from '../components/login/LoginForm';

class Login extends Component {

    render() {
        return (
            <LoginForm
                user={this.props.user}
                router={this.props.router}
                onSubmit={this.props.actions.login}
            />
        );
    }
}

export default connect(
    // mapStateToProps
    (state, ownProps) => {
        return {
            user: state.user
        };
    },
    dispatch => {
        return {
            actions: bindActionCreators({ login }, dispatch)
        };
    }
)(Login);

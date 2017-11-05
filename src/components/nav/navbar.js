import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout } from '../../actions/user';
import auth from '../../auth/authenticator';

class Navigation extends Component {
    static propTypes = {
        user: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.user) {
            auth.logOut();

            // No access to the router object on this navbar
            // This is a hack
            location.assign('/login');
        }
    }

    handleLogout(event) {
        this.props.actions.logout();
    }

    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Academe</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#">Home<span className="sr-only">(current)</span></a></li>
                            <li><a href="#">Teachers</a></li>
                            <li className="active"><a href="#">Students</a></li>
                            <li><a href="#">Reports</a></li>
                            <li><a href="#" onClick={this.handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
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
            actions: bindActionCreators({ logout }, dispatch)
        };
    }
)(Navigation);

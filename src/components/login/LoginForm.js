import PropTypes from 'prop-types';
import React, { Component } from 'react';
import auth from '../../auth/authenticator';

class LoginForm extends Component {
    static propTypes = {
        user: PropTypes.object,
        router: PropTypes.object,
        onSubmit: PropTypes.func.isRequired
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            auth.setUser(nextProps.user);
            this.props.router.push({ pathname: '/', query: {} });
        }
    }

    constructor(props) {
        super(props);

        // Set up state
        this.state = {
            email: 'admin@sis.com',
            pass: 'admin'
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleLogin(event) {
        event.preventDefault();

        if (this.props.onSubmit) {
            const credentials = {
                email: this.state.email,
                pass: this.state.pass
            };
            this.props.onSubmit(credentials);
            this.setState({
                email: '',
                pass: ''
            });
        }
    }

    handleFieldChange(event) {
        const fieldName = event.target.id;
        const fieldValue = event.target.value;

        this.setState({
            [fieldName]: fieldValue
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        &nbsp;
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
                    <div className="col-md-4">
                        <form className="login-form" onSubmit={this.handleLogin}>
                            <div className="form-group">
                                <label for="email">Email</label>
                                <input type="email" className="form-control" id="email" value={this.state.email} onChange={this.handleFieldChange} />
                            </div>
                            <div className="form-group">
                                <label for="pass">Password</label>
                                <input type="password" className="form-control" id="pass" value={this.state.pass} onChange={this.handleFieldChange} />
                            </div>
                            <button className="btn btn-warning btn-lg buttons" type="submit">Login</button>
                        </form>
                    </div>
                    <div className="col-md-4">
                        &nbsp;
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;

import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import AccountService from '../utils/account/AccountService';
import { EmailInput } from '../components/forms/EmailInput';
import { PasswordInput } from '../components/forms/PasswordInput';
import UserCredentialsValidator from '../utils/validation/UserCredentialsValidator';

export class LoginPage extends Component {
    constructor() {
        super();
        this.validator = new UserCredentialsValidator();
        this.auth = new AuthenticationService();
        this.account = new AccountService(this.auth);

        this.state = {
            buttonDisabled: true,
            email: '',
            password: '',
            loginError: null
        }
    }

    render() {
        return (
            <div>
                <h2>Login</h2>

                <form onSubmit={this.handleSubmit}>
                    <EmailInput onChange={this.handleChange} />
                    <PasswordInput onChange={this.handleChange} />

                    <Button type="submit" disabled={this.state.buttonDisabled} bsStyle="primary">Log in</Button>

                    <AlertBox error={this.state.loginError}></AlertBox>
                </form>
            </div>
        );
    }

    componentDidUpdate() {
        let areInputsValid = this.validator.validateEmail(this.state.email) && this.state.password !== '';

        if (this.state.buttonDisabled === true && areInputsValid) {
            this.setState({
                buttonDisabled: false
            });
        } else if (this.state.buttonDisabled === false && !areInputsValid) {
            this.setState({
                buttonDisabled: true
            });
        }
    }

    handleChange = (e) => {
        this.setState(
            {
                [e.target.id]: e.target.value
            }
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.auth.login(this.state.email, this.state.password)
            .then(response => {
                this.props.history.replace('/');
            })
            .catch(error => {
                this.setState({
                    loginError: error
                });
            });
    }
}

function AlertBox(props) {
    if (props.error === null) {
        return null;
    }

    let message = 'Error';

    if (props.error.response.status === 404) {
        message = 'User not found in database.';
    } else if (props.error.response.status === 401) {
        message = 'Incorrect email or password.';
    }

    return (
        <div className="with-padding-vertical">
            <Alert bsStyle="danger"><p>{message}</p></Alert>
        </div>
    );
}
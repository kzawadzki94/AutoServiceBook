import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import AccountService from '../utils/account/AccountService';
import { EmailInput } from '../components/forms/EmailInput';
import { PasswordInput } from '../components/forms/PasswordInput';
import UserCredentialsValidator from '../utils/validation/UserCredentialsValidator';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

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
        };
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
                toastr.success("User logged in.");
            })
            .catch(error => {
                if (error === "User not found!") {
                    toastr.error("Login error", "User not found in database.");
                } else {
                    toastr.error("Login error", "Invalid email or password.");
                }
            });
    }

    render() {
        return (
            <div>
                <h2>Login</h2>

                <form onSubmit={this.handleSubmit}>
                    <EmailInput onChange={this.handleChange} />
                    <PasswordInput onChange={this.handleChange} />

                    <Button type="submit" disabled={this.state.buttonDisabled} bsStyle="primary">Log in</Button>
                </form>
            </div>
        );
    }
}
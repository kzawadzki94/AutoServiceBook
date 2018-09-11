import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import AccountService from '../utils/account/AccountService';
import { EmailInput, PasswordInput, FirstNameInput, LastNameInput } from '../components';
import UserCredentialsValidator from '../utils/validation/UserCredentialsValidator';

export class RegisterPage extends Component {
    constructor() {
        super();
        this.validator = new UserCredentialsValidator();
        this.auth = new AuthenticationService();
        this.account = new AccountService(this.auth);

        this.state = {
            buttonDisabled: true,
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            errors: null,
            userCreated: false
        }
    }

    render() {
        if (this.state.userCreated) {
            return (
                <Alert bsStyle="success">
                    <h4>Account registered!</h4>
                    <p>
                        You can now proceed to the login page.
                </p>
                </Alert>
            );
        } else {
            return (
                <div>
                    <h2>Register</h2>

                    <form onSubmit={this.handleSubmit}>
                        <FirstNameInput onChange={this.handleChange} />
                        <LastNameInput onChange={this.handleChange} />
                        <EmailInput onChange={this.handleChange} />
                        <PasswordInput onChange={this.handleChange} validate />
                        <Alert bsStyle="info">
                            <p>Passwords must be at least 6 characters.</p>
                            <p>Passwords must have at least one non alphanumeric character.</p>
                            <p>Passwords must have at least one digit ('0'-'9').</p>
                            <p>Passwords must have at least one uppercase ('A'-'Z').</p>
                        </Alert>

                        <AlertBox error={this.state.errors}></AlertBox>
                        <Button type="submit" disabled={this.state.buttonDisabled} bsStyle="primary">Register</Button>
                    </form>
                </div>
            );
        }
    }

    componentDidUpdate() {
        let areInputsValid =
            this.validator.validateEmail(this.state.email)
            && this.validator.validatePassword(this.state.password)
            && this.state.firstname
            && this.state.lastname;

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

        this.account.register(this.state.firstname, this.state.lastname, this.state.email, this.state.password)
            .then(response => {
                if (response === 'User created') {
                    this.setState({
                        userCreated: true
                    });
                } else {
                    this.setState({
                        errors: this.getErrors(response)
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });

    }

    getErrors = (response) => {
        let messages = '';
        response.forEach(element => {
            messages += '<p>' + element.description + '</p>';
        })

        return messages;
    }
}

function AlertBox(props) {
    if (props.error === null) {
        return null;
    }

    return (
        <div>
            <Alert bsStyle="danger">
                <div dangerouslySetInnerHTML={{ __html: props.error }}></div>
            </Alert>
        </div>
    );
}
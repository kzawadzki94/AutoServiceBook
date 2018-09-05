import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Alert, InputGroup, Glyphicon } from 'react-bootstrap';
import UserCredentialsValidator from '../utils/validation/UserCredentialsValidator';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import AccountService from '../utils/account/AccountService';

export class LoginPage extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    <FormGroup controlId="email" validationState={this.getEmailValidationState()}>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph='envelope' /></InputGroup.Addon>
                            <FormControl type="text" placeholder="E-mail" onChange={this.handleChange} />
                            <FormControl.Feedback />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup controlId="password">
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph='asterisk' /></InputGroup.Addon>
                            <FormControl type="password" placeholder="Password" onChange={this.handleChange} />
                            <FormControl.Feedback />
                        </InputGroup>
                    </FormGroup>

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

    getEmailValidationState() {
        if (this.state.email === '') {
            return;
        }

        if (this.validator.validateEmail(this.state.email)) {
            return 'success';
        }
        return 'error';
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.id]: e.target.value
            }
        )
    }

    handleSubmit(e) {
        e.preventDefault();

        this.auth.login(this.state.email, this.state.password)
            .then(response => {
                this.account.fetchInfo();
                this.props.history.replace('/');
            })
            .catch(error => {
                this.setState({
                    loginError: error.response.statusText
                });
            });
    }
}

function AlertBox(props) {
    if (props.error === null) {
        return null;
    }

    let message = 'Error';

    if (props.error === 'Not Found') {
        message = 'User not found in database.';
    } else if (props.error === 'Unauthorized') {
        message = 'Incorrect email or password.';
    }

    return (
        <div className="with-padding-vertical">
            <Alert bsStyle="danger">{message}</Alert>
        </div>
    );
}
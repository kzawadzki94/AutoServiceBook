import React, { Component } from 'react';
import { Well, FormGroup, FormControl, Button, Alert } from 'react-bootstrap';
import UserCredentialsValidator from '../utils/validation/UserCredentialsValidator';
import AuthenticationService from '../utils/authentication/AuthenticationService';

export class LoginForm extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validator = new UserCredentialsValidator();
        this.auth = new AuthenticationService();

        this.state = {
            buttonDisabled: true,
            email: '',
            password: '',
            loginError: null
        }
    }

    componentWillMount() {
        if (this.auth.isUserLoggedIn()) {
            this.props.history.replace('/');
        }
    }

    render() {
        return (
            <div className="center">
                <Well>
                    <h1>Login</h1>

                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="email" validationState={this.getEmailValidationState()}>
                            <FormControl type="text" placeholder="E-mail" onChange={this.handleChange} />
                            <FormControl.Feedback />
                        </FormGroup>

                        <FormGroup controlId="password">
                            <FormControl type="password" placeholder="Password" onChange={this.handleChange} />
                            <FormControl.Feedback />
                        </FormGroup>

                        <Button type="submit" disabled={this.state.buttonDisabled}>Log in</Button>

                        <AlertBox error={this.state.loginError}></AlertBox>
                    </form>
                </Well>
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
        <Alert bsStyle="danger">{message}</Alert>
    );
}
import React, { Component } from 'react';
import { Well, FormGroup, FormControl, Button } from 'react-bootstrap';
import { UserCredentialsValidator } from '../utils/validation/UserCredentialsValidator';


export class Login extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validator = new UserCredentialsValidator();

        this.state = {
            buttonDisabled: true,
            email: '',
            password: ''
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
                    </form>
                </Well>
            </div>
        );
    }

    componentDidUpdate() {
        let inputsValid = this.validator.validateEmail(this.state.email) && this.state.password !== '';

        if (this.state.buttonDisabled === true && inputsValid) {
            this.setState({
                buttonDisabled: false
            });
        } else if (this.state.buttonDisabled === false && !inputsValid) {
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
    }
}
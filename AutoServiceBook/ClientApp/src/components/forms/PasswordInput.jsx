import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import UserCredentialsValidator from '../../utils/validation/UserCredentialsValidator';

export class PasswordInput extends Component {
    constructor(props) {
        super(props);

        this.validator = new UserCredentialsValidator();
        this.state = {
            password: ''
        };
    }

    render() {
        return (
            <FormGroup controlId="password" validationState={this.validationState()}>
                <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph='asterisk' /></InputGroup.Addon>
                    <FormControl type="password" placeholder="Password" onChange={this.handleChange} />
                    <FormControl.Feedback />
                </InputGroup>
            </FormGroup>
        );
    }

    handleChange = (e) => {
        this.props.onChange(e);
        this.setState(
            {
                [e.target.id]: e.target.value
            }
        );
    }

    validationState = () => {
        if (this.state.password === '' || !this.props.validate) {
            return;
        }

        if (this.validator.validatePassword(this.state.password)) {
            return 'success';
        }
        return 'error';
    }
}
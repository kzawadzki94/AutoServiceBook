import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import UserCredentialsValidator from '../../utils/validation/UserCredentialsValidator';

export class EmailInput extends Component {
    constructor(props) {
        super(props);

        this.validator = new UserCredentialsValidator();
        this.state = {
            email: ''
        };
    }

    render() {
        return (
            <FormGroup controlId="email" validationState={this.validationState()}>
                <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph='envelope' /></InputGroup.Addon>
                    <FormControl type="text" placeholder="E-mail" onChange={this.handleChange} />
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
        if (this.state.email === '') {
            return;
        }

        if (this.validator.validateEmail(this.state.email)) {
            return 'success';
        }
        return 'error';
    }
}
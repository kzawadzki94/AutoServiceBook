import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

export class FirstNameInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: ''
        };
    }

    render() {
        return (
            <FormGroup controlId="firstname" validationState={this.validationState()}>
                <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph='user' /></InputGroup.Addon>
                    <FormControl type="text" placeholder="First Name" onChange={this.handleChange} />
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
        if (this.state.firstname === '') {
            return;
        }

        if (this.state.firstname.length > 0) {
            return 'success';
        }
        return 'error';
    }
}
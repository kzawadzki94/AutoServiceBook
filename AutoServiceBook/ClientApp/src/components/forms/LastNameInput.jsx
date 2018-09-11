import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

export class LastNameInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastname: ''
        };
    }

    render() {
        return (
            <FormGroup controlId="lastname" validationState={this.validationState()}>
                <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph='star' /></InputGroup.Addon>
                    <FormControl type="text" placeholder="Last Name" onChange={this.handleChange} />
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
        if (this.state.lastname === '') {
            return;
        }

        if (this.state.lastname.length > 0) {
            return 'success';
        }
        return 'error';
    }
}
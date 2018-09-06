import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

export class PasswordInput extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            password: ''
        };
    }

    render() {
        return (
            <FormGroup controlId="password">
                <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph='asterisk' /></InputGroup.Addon>
                    <FormControl type="password" placeholder="Password" onChange={this.handleChange} />
                    <FormControl.Feedback />
                </InputGroup>
            </FormGroup>
        );
    }

    handleChange(e) {
        this.props.onChange(e);
        this.setState(
            {
                [e.target.id]: e.target.value
            }
        );
    }
}
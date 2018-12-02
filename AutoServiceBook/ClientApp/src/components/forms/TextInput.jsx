import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, InputGroup } from 'react-bootstrap';

export class TextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            type: "text",
            minLength: 0
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.value && this.props != prevProps) {
            this.setState({
                text: this.props.value.toString(),
                minLength: this.props.minLength || 0
            })
        }
    }

    render() {
        return (
            <FormGroup controlId={this.props.controlId} validationState={this.validationState()}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <InputGroup>
                    <FormControl type={this.state.type} onChange={this.handleChange} value={this.props.value.toString()} />
                    <FormControl.Feedback />
                </InputGroup>
            </FormGroup>
        );
    }

    handleChange = (e) => {
        this.props.onChange(e);
        this.setState(
            {
                text: e.target.value.toString()
            }
        );
    }

    validationState = () => {
        if (this.props.required) {
            if (this.state.text && this.state.text.length >= this.state.minLength) {
                return 'success';
            }
            return 'error';
        }
    }
}
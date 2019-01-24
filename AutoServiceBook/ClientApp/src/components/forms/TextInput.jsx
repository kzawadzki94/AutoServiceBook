import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, InputGroup } from 'react-bootstrap';

export class TextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            type: "text",
            minLength: 0,
            maxLength: 255
        }
    }

    componentDidMount() {
        this.setParameters();
    }

    componentDidUpdate(prevProps) {
        if (this.props.value && this.props.value != prevProps.value) {
            this.setParameters();
        }
    }

    setParameters = () => {
        this.setState({
            text: this.props.value.toString(),
            minLength: this.props.minLength || 0,
            maxLength: this.props.maxLength || 255
        })
    }

    render() {

        return (
            <FormGroup controlId={this.props.controlId} validationState={this.validationState()}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <InputGroup>
                    <FormControl type={this.state.type} onChange={this.handleChange} value={this.props.value.toString()} step={this.props.step}/>
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
            if (this.state.text && this.state.text.toString().length >= this.state.minLength && this.state.text.toString().length <= this.state.maxLength) {
                return 'success';
            }
            return 'error';
        }
    }
}
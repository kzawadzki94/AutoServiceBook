import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, InputGroup } from 'react-bootstrap';

export class DateInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            type: "date"
        };
    }

    componentDidMount() {
        this.setState({
            value: this.formatDate(this.props.value.toString())
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.value && this.props.value != prevProps.value) {
            this.setState({
                value: this.formatDate(this.props.value.toString())
            });
        }
    }

    handleChange = (e) => {
        this.props.onChange(e);
        this.setState(
            {
                value: e.target.value.toString()
            }
        );
    }

    formatDate = (date) => {
        if (!date)
            return "";

        if (date.toString().includes('T')) {
            return date.toString().substring(0, date.indexOf('T'));
        }
        return date;
    }

    validationState = () => {
        if (this.props.required) {
            if (this.state.value || this.state.value !== "") {
                return 'success';
            }
            return 'error';
        }
    }

    render() {
        return (
            <FormGroup controlId={this.props.controlId} validationState={this.validationState()}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <InputGroup>
                    <FormControl type={this.state.type} onChange={this.handleChange} value={this.formatDate(this.props.value)} />
                    <FormControl.Feedback />
                </InputGroup>
            </FormGroup>
        );
    }
}
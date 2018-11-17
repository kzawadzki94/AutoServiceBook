import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export class SelectInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const selectOptions = this.props.options.map((v, i) =>
            <option key={i} value={v.value}>{v.key}</option>
        );

        return (
            <FormGroup controlId={this.props.controlId}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl componentClass="select" placeholder="select" onChange={this.handleChange} value={this.props.selected}>
                    {selectOptions}
                </FormControl>
            </FormGroup>
        );
    }

    handleChange = (e) => {
        this.props.onChange(e);
    }
}
import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import 'toastr/build/toastr.css';
import { DateInput, NumericInput, SelectInput, TextInput } from '../components';
import { ExpensesContext } from '../pages/ExpensesPage';


export class ExpensesForm extends Component {
    constructor() {
        super();
    }

    render() {
        if (!this.context.showForm) {
            return <Button bsStyle="primary" onClick={this.context.toggleForm}><Glyphicon glyph="plus" /> Add expense</Button>;
        }

        const typeOptions = [
            { key: "Service", value: 0 },
            { key: "Spare part", value: 1 },
            { key: "Fuel", value: 2 },
            { key: "Insurance", value: 3 },
            { key: "Other", value: 4 },
        ];

        let vehiclesOptions = this.context.vehicles.map(v => ({ key: v.make + ' ' + v.model + ' ' + v.year, value: v.vehicleId }));

        return (
            <React.Fragment>
                <h2>{this.context.buttonText} expense</h2>
                <form onSubmit={this.context.handleSubmit}>
                    <SelectInput controlId="vehicleId" label="Vehicle" options={vehiclesOptions} onChange={this.context.handleChange} selected={this.context.selectedExpense.vehicleId} />
                    <DateInput controlId="date" label="Date" onChange={this.context.handleChange} value={this.context.selectedExpense.date} required />
                    <SelectInput controlId="type" label="Expense Type" options={typeOptions} onChange={this.context.handleChange} selected={this.context.selectedExpense.type} />
                    <NumericInput controlId="count" label="Count" onChange={this.context.handleChange} value={this.context.selectedExpense.count} required />
                    <NumericInput controlId="price" label="Price" onChange={this.context.handleChange} value={this.context.selectedExpense.price} required step="0.01"/>
                    <TextInput controlId="details" label="Details" onChange={this.context.handleChange} value={this.context.selectedExpense.details} />
                    <NumericInput controlId="mileage" label="Odometer - km" onChange={this.context.handleChange} value={this.context.selectedExpense.mileage} />
                    <Button type="submit" bsStyle="primary">{this.context.buttonText}</Button>
                    <Button bsStyle="warning" onClick={this.context.toggleForm}>Cancel</Button>
                </form>
            </React.Fragment>
        );
    }
}
ExpensesForm.contextType = ExpensesContext;
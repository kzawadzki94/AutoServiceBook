import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import CommonFormatter from '../utils/common/CommonFormatter';
import { ExpensesContext } from '../pages/ExpensesPage';

export class ExpensesDetails extends Component {
    constructor(props) {
        super(props);

        this.formatter = new CommonFormatter();
    }

    render() {
        const columns = [
            {
                Header: 'Date',
                accessor: 'date',
                minWidth: 50,
                Cell: props => this.formatter.formatDate(props.value)
            },
            {
                Header: 'Type',
                accessor: 'type',
                minWidth: 50,
                Cell: props => this.formatter.formatExpenseType(props.value)
            },
            {
                Header: 'Count',
                accessor: 'count',
                minWidth: 20
            },
            {
                Header: 'Price',
                accessor: 'price',
                minWidth: 40
            },
            {
                Header: 'Details',
                accessor: 'details',
                Cell: props => this.formatter.formatEmptyOrNull(props.value),
                minWidth: 120
            },
            {
                Header: 'Odometer',
                accessor: 'mileage',
                Cell: props => this.formatter.formatEmptyOrNull(props.value) + " km",
                minWidth: 80
            },
            {
                Header: '',
                accessor: 'expenseId',
                Cell: props => <Button onClick={this.context.handleButtonClick} bsStyle="warning" bsSize="xsmall" value={props.value}>Edit</Button>,
                sortable: false,
                resizable: false,
                minWidth: 30
            },
            {
                Header: '',
                accessor: 'expenseId',
                Cell: props => <Button onClick={this.context.handleButtonClick} bsStyle="danger" bsSize="xsmall" value={props.value}>Delete</Button>,
                sortable: false,
                resizable: false,
                minWidth: 30
            }
        ];

        return (
            <ReactTable data={this.context.expenses} columns={columns} defaultPageSize={10} defaultSorted={[{ id: "date", desc: true }]} />
        );
    }
}
ExpensesDetails.contextType = ExpensesContext;
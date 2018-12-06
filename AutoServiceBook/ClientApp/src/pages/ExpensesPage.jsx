import React, { Component } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Glyphicon, Well, PanelGroup, Panel } from 'react-bootstrap';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import ExpensesService from '../utils/expenses/ExpensesService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import CommonFormatter from '../utils/common/CommonFormatter';

export class ExpensesPage extends Component {
    constructor() {
        super();

        this.auth = new AuthenticationService();
        this.expensesService = new ExpensesService(this.auth);
        this.formatter = new CommonFormatter();

        this.state = {
            expenses: null,
            isLoading: true
        };
    }

    componentDidMount() {
        this.fetchExpenses();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isLoading !== this.state.isLoading) {
            this.fetchExpenses();
        }
    }

    fetchExpenses = () => {
        this.expensesService.getExpenses()
            .then(response => {
                this.setState({
                    expenses: response,
                    isLoading: false
                });
            });
    }

    handleButtonClick = (e) => {
        console.log(e.target.value);
    };

    render() {
        if (this.state.isLoading) {
            return (<p>Loading...</p>);
        }

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
                Cell: props => <Button onClick={this.handleButtonClick} bsStyle="warning" bsSize="xsmall" value={props.value}>Edit</Button>,
                sortable: false,
                resizable: false,
                minWidth: 30
            },
            {
                Header: '',
                accessor: 'expenseId',
                Cell: props => <Button onClick={this.handleButtonClick} bsStyle="danger" bsSize="xsmall" value={props.value}>Delete</Button>,
                sortable: false,
                resizable: false,
                minWidth: 30
            }
        ];

        return (
            <div>
                <h2>Expenses</h2>
                <ReactTable data={this.state.expenses} columns={columns} defaultPageSize={10} defaultSorted={[{id: "date", desc: true}]}/>
            </div>
        );
    }
}
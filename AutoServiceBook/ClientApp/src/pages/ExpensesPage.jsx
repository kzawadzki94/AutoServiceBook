import React, { Component } from 'react';
import 'react-table/react-table.css';
import { ExpensesDetails } from '../components/ExpensesDetails';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import CommonFormatter from '../utils/common/CommonFormatter';
import ExpensesService from '../utils/expenses/ExpensesService';

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

    render() {
        if (this.state.isLoading) {
            return (<p>Loading...</p>);
        }

        return (
            <div>
                <h2>Expenses</h2>
                <ExpensesDetails data={this.state.expenses} />
            </div>
        );
    }
}
import React, { Component } from 'react';
import 'react-table/react-table.css';
import { ExpensesDetails } from '../components/ExpensesDetails';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import CommonFormatter from '../utils/common/CommonFormatter';
import ExpensesService from '../utils/expenses/ExpensesService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

export const ExpensesContext = React.createContext();

export class ExpensesPage extends Component {
    constructor() {
        super();

        this.auth = new AuthenticationService();
        this.expensesService = new ExpensesService(this.auth);

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

    handleButtonClick = (e) => {
        let selectedAction = e.target.innerHTML.replace(/<(?:.|\n)*?>/gm, '').trim();
        let selectedExpenseId = e.target.value;

        let selectedExpense = this.state.expenses.find(e => e.expenseId === parseInt(selectedExpenseId));

        switch (selectedAction) {
            case "Delete":
                this.deleteExpense(selectedExpense);
                break;
        }
    }

    reload = () => {
        this.setState({
            isLoading: true
        });
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

    deleteExpense = (expense) => {
        confirmAlert({
            title: 'Confirm expense delete',
            message: 'Are you sure to expense from ' + expense.date + '?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.expensesService.deleteExpense(expense.expenseId).then(() => {
                            this.reload();
                        });
                        toastr.success("Expense deleted!");
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div>
                <h2>Expenses</h2>

                <ExpensesContext.Provider value={{
                    expenses: this.state.expenses,
                    handleButtonClick: this.handleButtonClick
                }}
                >
                    <ExpensesDetails />
                </ExpensesContext.Provider>

            </div>
        );
    }
}
import React, { Component } from 'react';
import { Well } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-table/react-table.css';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { ExpensesDetails, ExpensesForm } from '../components';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import ExpensesService from '../utils/expenses/ExpensesService';
import CommonFormatter from '../utils/common/CommonFormatter';

export const ExpensesContext = React.createContext();

export class ExpensesPage extends Component {
    constructor() {
        super();

        this.auth = new AuthenticationService();
        this.expensesService = new ExpensesService(this.auth);
        this.formatter = new CommonFormatter();

        this.state = {
            expenses: null,
            isLoading: true,
            showForm: false,
            buttonText: "Add",
            selectedExpense: this.getExpenseEmptyState()
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
            case "Edit":
                selectedExpense.date = this.formatter.formatDateInput(selectedExpense.date);
                this.setState({
                    selectedExpense,
                    showForm: true,
                    buttonText: "Update"
                });
                break;
        }
    }

    handleChange = (e) => {
        let expense = { ...this.state.selectedExpense };
        expense[[e.target.id]] = e.target.value;

        this.setState({
            selectedExpense: expense
        });
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

    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm,
            selectedExpense: this.getExpenseEmptyState(),
            buttonText: "Add"
        });
    }

    getExpenseEmptyState = () => {
        return {
            ownerId: null,
            date: "",
            type: "0",
            count: "",
            price: "",
            details: "",
            mileage: ""
        };
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
                    handleButtonClick: this.handleButtonClick,
                    handleChange: this.handleChange,
                    showForm: this.state.showForm,
                    buttonText: this.state.buttonText,
                    toggleForm: this.toggleForm,
                    selectedExpense: this.state.selectedExpense
                }}
                >
                    <Well>
                        <ExpensesForm />
                    </Well>

                    <ExpensesDetails />
                </ExpensesContext.Provider>

            </div>
        );
    }
}
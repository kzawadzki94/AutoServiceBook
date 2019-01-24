import React, { Component } from 'react';
import { Well, Row, PageHeader } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-table/react-table.css';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { ExpensesDetails, ExpensesForm } from '../components';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import ExpensesService from '../utils/expenses/ExpensesService';
import VehiclesService from '../utils/vehicles/VehiclesService';
import CommonFormatter from '../utils/common/CommonFormatter';
import moment from 'moment';
import { PulseLoader } from 'react-spinners';

export const ExpensesContext = React.createContext();

export class ExpensesPage extends Component {
    constructor() {
        super();

        this.auth = new AuthenticationService();
        this.expensesService = new ExpensesService(this.auth);
        this.vehiclesService = new VehiclesService(this.auth);
        this.formatter = new CommonFormatter();

        this.state = {
            vehicles: null,
            expenses: null,
            isLoading: true,
            showForm: false,
            buttonText: "Add",
            selectedExpense: this.getExpenseEmptyState()
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isLoading !== this.state.isLoading) {
            this.fetchData();
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
                this.setState({
                    selectedExpense,
                    showForm: true,
                    buttonText: "Update"
                });
                break;
            default:
                console.log("Wrong button action!");
                break;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.selectedExpense.ownerId) {
            this.expensesService.editExpense(this.state.selectedExpense)
                .then(response => {
                    return this.vehiclesService.updateOdometerIfNeeded(this.state.selectedExpense.vehicleId, this.state.selectedExpense.mileage);
                })
                .then(response => {
                    this.toggleForm();
                    this.reload();
                    toastr.success("Expense updated!");
                })
                .catch(error => {
                    toastr.error("Update failed", "Failed to update expense");
                    this.displayErrors(error);
                });
        }
        else {
            this.expensesService.addExpense(this.state.selectedExpense)
                .then(response => {
                    return this.vehiclesService.updateOdometerIfNeeded(this.state.selectedExpense.vehicleId, this.state.selectedExpense.mileage);
                })
                .then(response => {
                    this.toggleForm();
                    this.reload();
                    toastr.success("Expense added!");
                })
                .catch(error => {
                    toastr.error("Add failed", "Failed to add expense");
                    this.displayErrors(error);
                });
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

    displayErrors = (error) => {
        let arr = Array.from(Object.keys(error), k => error[k]);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] instanceof Array) {
                this.displayErrors(arr[i]);
            } else {
                toastr.error(arr[i]);
            }
        }
    }

    fetchData = () => {
        Promise.all([
            this.vehiclesService.getVehicles(),
            this.expensesService.getExpenses()
        ])
            .then(([vehicles, expenses]) => {
                let selectedExpense = this.getExpenseEmptyState();
                selectedExpense.vehicleId = vehicles[0].vehicleId;
                this.setState({
                    expenses,
                    vehicles,
                    isLoading: false,
                    selectedExpense
                });
            }).catch(err => {
                this.setState({
                    isLoading: false
                });
            });
    }

    deleteExpense = (expense) => {
        confirmAlert({
            title: 'Confirm expense delete',
            message: 'Are you sure to expense from ' + this.formatter.formatDate(expense.date) + '?',
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
        let selectedExpense = this.getExpenseEmptyState();
        selectedExpense.vehicleId = this.state.vehicles[0].vehicleId;
        this.setState({
            showForm: !this.state.showForm,
            selectedExpense: selectedExpense,
            buttonText: "Add"
        });
    }

    getExpenseEmptyState = () => {
        return {
            ownerId: null,
            date: moment().format(),
            type: "0",
            count: "",
            price: "",
            details: "",
            mileage: "0"
        };
    }

    render() {
        if (this.state.isLoading) {
            return <PulseLoader color="#1967be" loading={this.state.isLoading} />;
        }

        if (!this.state.vehicles) {
            return <p>You need to add a vehicle first!</p>;
        }

        return (
            <div>
                <Row>
                    <PageHeader>
                        Expenses
                    </PageHeader>
                </Row>

                <ExpensesContext.Provider value={{
                    expenses: this.state.expenses,
                    vehicles: this.state.vehicles,
                    handleButtonClick: this.handleButtonClick,
                    handleChange: this.handleChange,
                    handleSubmit: this.handleSubmit,
                    showForm: this.state.showForm,
                    buttonText: this.state.buttonText,
                    toggleForm: this.toggleForm,
                    selectedExpense: this.state.selectedExpense
                }}
                >
                    <Row>
                        <Well>
                            <ExpensesForm />
                        </Well>
                    </Row>

                    <Row>
                        <ExpensesDetails />
                    </Row>
                </ExpensesContext.Provider>

            </div>
        );
    }
}
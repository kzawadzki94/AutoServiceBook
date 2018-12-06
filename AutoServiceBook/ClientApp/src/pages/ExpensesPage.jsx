import React, { Component } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Glyphicon, Well, PanelGroup, Panel } from 'react-bootstrap';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import ExpensesService from '../utils/expenses/ExpensesService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

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

            </div>
        );
    }
}
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import AccountService from '../utils/account/AccountService';

export class AccountPage extends Component {
    constructor() {
        super();
        this.account = new AccountService();
        this.state = {
            user: this.account.getInfo()
        };
    }

    render() {
        return (
            <div>
                <h2>Account</h2>
                <Table striped bordered condensed hover>
                    <tbody>
                        <tr>
                            <th>First Name:</th>
                            <td>{this.state.user.firstName}</td>
                        </tr>
                        <tr>
                            <th>Last Name: </th>
                            <td>{this.state.user.lastName}</td>
                        </tr>
                        <tr>
                            <th>Email: </th>
                            <td>{this.state.user.email}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

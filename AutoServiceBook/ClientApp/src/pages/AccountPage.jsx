import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import AuthenticationService from '../utils/authentication/AuthenticationService'

export class AccountPage extends Component {
    constructor() {
        super();
        this.auth = new AuthenticationService();
        this.state = {
            user: this.auth.getProfile()
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
                            <td>{this.state.user.given_name}</td>
                        </tr>
                        <tr>
                            <th>Last Name: </th>
                            <td>{this.state.user.family_name}</td>
                        </tr>
                        <tr>
                            <th>Email: </th>
                            <td>{this.state.user.sub}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

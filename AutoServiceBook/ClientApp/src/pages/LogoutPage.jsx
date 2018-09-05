import React, { Component } from 'react';
import { ProgressBar, Row } from 'react-bootstrap'
import AuthenticationService from '../utils/authentication/AuthenticationService';
import AccountService from '../utils/account/AccountService';

export class LogoutPage extends Component {
    constructor() {
        super();
        this.auth = new AuthenticationService();
        this.account = new AccountService(this.auth);
        this.state = {
            progress: 0
        };
    }

    componentDidMount() {
        var intervalId = setInterval(() => {
            let newProgress = this.state.progress + 50;

            this.setState({
                progress: newProgress
            });

            if (this.state.progress > 100) {
                clearInterval(intervalId);
                this.auth.logout();
                this.account.destroyInfo();
                this.props.history.push('/login');
            }

        }, 1000);
    }

    render() {
        return (
            <Row>
                <ProgressBar now={this.state.progress} striped active />
            </Row>
        );
    }
}

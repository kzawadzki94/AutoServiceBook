import React, { Component } from 'react';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import { Jumbotron, Row, Col, PageHeader } from 'react-bootstrap';
import { StatsCost } from '../components';
import moment from 'moment';


export class HomePage extends Component {

    constructor() {
        super();
        this.auth = new AuthenticationService();
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Row>
                    <Jumbotron>
                        <h2>Welcome to the AutoServiceBook!</h2>
                        <p>Store and manage information about your vehicle expenses!</p>
                        <small>Krzysztof Zawadzki &copy; {moment().format("YYYY")}</small>
                    </Jumbotron>
                </Row>

                <Row>
                    <PageHeader>
                        Statistics
                    </PageHeader>
                </Row>

                <Row>
                    <Col md={3} sm={6}>
                        <StatsCost header="Alltime" period="alltime" />
                    </Col>

                    <Col md={3} sm={6}>
                        <StatsCost header="Last year" period="year" />
                    </Col>

                    <Col md={3} sm={6}>
                        <StatsCost header="Last month" period="month" />
                    </Col>

                    <Col md={3} sm={6}>
                        <StatsCost header="Last week" period="week" />
                    </Col>

                </Row>
            </div>
        );
    }
}

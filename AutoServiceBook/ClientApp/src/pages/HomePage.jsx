import React, { Component } from 'react';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import { Jumbotron, Row, Col, PageHeader, Well } from 'react-bootstrap';
import { StatsCost, StatsDistributionChart, StatsLastYearChart } from '../components';
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
            <React.Fragment>
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
                        <Well><StatsCost header="Alltime" period="alltime" /></Well>
                    </Col>

                    <Col md={3} sm={6}>
                        <Well><StatsCost header="Last year" period="year" /></Well>
                    </Col>

                    <Col md={3} sm={6}>
                        <Well><StatsCost header="Last month" period="month" /></Well>
                    </Col>

                    <Col md={3} sm={6}>
                        <Well><StatsCost header="Last week" period="week" /></Well>
                    </Col>
                </Row>

                <Row>
                    <Col md={3} sm={6}>
                        <Well><StatsDistributionChart header="Alltime distribution" period="alltime" /></Well>
                    </Col>

                    <Col md={3} sm={6}>
                        <Well><StatsDistributionChart header="Last year distribution" period="year" /></Well>
                    </Col>

                    <Col md={3} sm={6}>
                        <Well><StatsDistributionChart header="Last month distribution" period="month" /></Well>
                    </Col>

                    <Col md={3} sm={6}>
                        <Well><StatsDistributionChart header="Last week distribution" period="week" /></Well>
                    </Col>
                </Row>

                <Row>
                    <Col lg={12}>
                    <Well>
                            <StatsLastYearChart header="Last year costs by month" />
                        </Well>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

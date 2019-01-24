import React, { Component } from 'react';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import StatsService from '../utils/stats/StatsService';
import { ClipLoader } from 'react-spinners';


export class StatsCost extends Component {

    constructor() {
        super();
        this.auth = new AuthenticationService();
        this.statsService = new StatsService(this.auth);
        this.state = {
            data: null,
            isLoading: true
        };
    }

    componentDidMount() {
        this.fetchData(this.props.period);
    }

    fetchData = (period) => {
        this.statsService.getCosts(period).then(response => {
            this.setState({
                data: response,
                isLoading: false
            });
        });
    }

    render() {

        if (this.state.isLoading) {
            return <ClipLoader loading={this.state.isLoading} color="#1967be" />;
        }

        return (
            <React.Fragment>
                <h3>{this.props.header}</h3>
                <p>
                    <span><b>Total cost:</b> {this.state.data.total}</span><br />
                    <span><b>Fuel cost:</b> {this.state.data.fuelCost}</span><br />
                    <span><b>Service cost:</b> {this.state.data.serviceCost}</span><br />
                    <span><b>Spare parts cost:</b> {this.state.data.sparePartCost}</span><br />
                    <span><b>Insurance cost:</b> {this.state.data.insuranceCost}</span><br />
                    <span><b>Other cost:</b> {this.state.data.otherCost}</span><br />
                    <br />
                    <span><b>Fuel usage:</b> {this.state.data.fuelUsage.toFixed(2)} l/100km</span>
                </p>
            </React.Fragment>
        );
    }
}

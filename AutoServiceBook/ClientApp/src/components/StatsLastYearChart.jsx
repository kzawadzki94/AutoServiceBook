import React, { Component } from 'react';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import StatsService from '../utils/stats/StatsService';
import { ClipLoader } from 'react-spinners';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export class StatsLastYearChart extends Component {

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
        this.fetchData();
    }

    fetchData = (vehicleId) => {
        this.statsService.getLastYearChartData(vehicleId).then(response => {
            if (response.length > 0) {
                this.setState({
                    data: response,
                    isLoading: false
                });
            } else {
                this.setState({
                    isLoading: false
                });
            }
        });
    }

    render() {

        if (this.state.isLoading) {
            return <ClipLoader loading={this.state.isLoading} color="#1967be" />;
        }

        return (
            <React.Fragment>
                <h3>{this.props.header}</h3>
                <ResponsiveContainer height={300} width="100%">
                <BarChart data={this.state.data}>
                    <XAxis dataKey="name" />
                    <YAxis dataKey="value"/>
                    <CartesianGrid strokeDasharray="1 1" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1967be"/>
                </BarChart>
            </ResponsiveContainer>
            </React.Fragment>
        );
    }
}

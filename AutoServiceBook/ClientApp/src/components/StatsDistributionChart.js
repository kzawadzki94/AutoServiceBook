import React, { Component } from 'react';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import StatsService from '../utils/stats/StatsService';
import { Well } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';


export class StatsDistributionChart extends Component {

    constructor() {
        super();
        this.auth = new AuthenticationService();
        this.statsService = new StatsService(this.auth);
        this.state = {
            data: null,
            isLoading: true
        };
        this.COLORS = ['#1967be', '#043A77', '#1A5E63', '#021833', '#213954', '#6295D1'];
    }

    componentDidMount() {
        this.fetchData(this.props.period);
    }

    fetchData = (period) => {
        this.statsService.getDistribution(period).then(response => {
            this.setState({
                data: response,
                isLoading: false
            });
        });
    }

    render() {

        if (this.state.isLoading) {
            return <ClipLoader loading={this.state.isLoading} color="#1967be" />;
        } else if (!this.state.data || this.state.data.length === 0) {
            return null;
        }

        return (
                <Well>
                    <h3>{this.props.header}</h3>
                <PieChart width={250} height={100}>
                    <Pie data={this.state.data} dataKey="value" label={(props) => { return props.name; }}>
                        {
                            this.state.data.map((entry, index) => <Cell key={index} fill={this.COLORS[index % this.COLORS.length]} />)
                        }
                    </Pie>
                    <Tooltip formatter={(value) => { return value + " %"; }} />
                    </PieChart>
                </Well>
        );
    }
}

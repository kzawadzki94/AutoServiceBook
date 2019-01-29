import React, { Component } from 'react';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import StatsService from '../utils/stats/StatsService';
import { ClipLoader } from 'react-spinners';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';


export class StatsDistributionChart extends Component {

    constructor() {
        super();
        this.auth = new AuthenticationService();
        this.statsService = new StatsService(this.auth);
        this.state = {
            data: [{ name: 'N/A', value: 100 }],
            isLoading: true
        };
        this.COLORS = ['#1967be', '#043A77', '#1A5E63', '#021833', '#213954', '#6295D1'];
    }

    componentDidMount() {
        this.fetchData(this.props.period);
    }

    fetchData = (period) => {
        this.statsService.getDistribution(period).then(response => {
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
                <ResponsiveContainer height={100} width="100%">
                    <PieChart>
                        <Pie data={this.state.data.filter((e) => e.value !== 0)} dataKey="value" label={(props) => { return props.name; }}>
                            {
                                this.state.data.map((entry, index) => <Cell key={index} fill={this.COLORS[index % this.COLORS.length]} />)
                            }
                        </Pie>
                        <Tooltip formatter={(value) => { return value + " %"; }} />
                    </PieChart>
                </ResponsiveContainer>
            </React.Fragment>
        );
    }
}

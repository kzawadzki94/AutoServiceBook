import React, { Component } from 'react';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import StatsService from '../utils/stats/StatsService';

export class HomePage extends Component {

    constructor() {
        super();
        this.auth = new AuthenticationService();
        this.stats = new StatsService(this.auth);
    }

    render() {
        this.stats.getTotalCost("week").then(res => {
            console.log("Total cost for last week: " + res);
        });

        this.stats.getCostForGivenMonth(1, 2019).then(res => {
            console.log("Cost for January 2019: " + res);
        });

        this.stats.getDistribution().then(res => {
            console.log("Alltime expenses distribution:");
            console.log(res);
        });

        this.stats.getFuelUsage().then(res => {
            console.log("Alltime fuel usage " + res);
        });

    return (
      <div>

      </div>
    );
  }
}

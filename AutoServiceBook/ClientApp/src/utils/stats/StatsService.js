import {
    API_CONFIG
} from '../../config/ApiConfig';
import queryString from 'query-string';
import AuthenticationService from '../authentication/AuthenticationService';

export default class StatsService {
    constructor(auth) {
        this.auth = auth || new AuthenticationService();
        this.statsEndpoint = `${API_CONFIG["URL_BASE"]}/stats`;
    }

    getCosts(period, vehicleId) {
        return this.auth.fetch(this.statsEndpoint + "/costs/" + period + "?" + queryString.stringify({ vehicleId }), {
            method: 'GET'
        }).then(response => {
            return Promise.resolve(response);
        });
    }

    getLastYearChartData(vehicleId) {
        return this.auth.fetch(this.statsEndpoint + "/lastyearchart/" + queryString.stringify({ vehicleId }), {
            method: 'GET'
        }).then(response => {
            return Promise.resolve(response);
        });
    }

    getDistribution(period, vehicleId) {
        return this.auth.fetch(this.statsEndpoint + "/distribution/" + period + "?" + queryString.stringify({ vehicleId }), {
            method: 'GET'
        }).then(response => {
            return Promise.resolve(response);
        });
    }
}
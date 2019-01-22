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
        console.log(this.statsEndpoint + "/costs/" + period + "?" + queryString.stringify({ vehicleId }));
        return this.auth.fetch(this.statsEndpoint + "/costs/" + period + "?" + queryString.stringify({ vehicleId }), {
            method: 'GET'
        }).then(response => {
            return Promise.resolve(response);
        });
    }

    getCostForGivenMonth(month, year, vehicleId) {
        return this.auth.fetch(this.statsEndpoint + "/costformonth/" + month + "/" + year + "?" + queryString.stringify({ vehicleId }), {
            method: 'GET'
        }).then(response => {
            return Promise.resolve(response);
        });
    }

    getDistribution(period, vehicleId) {
        console.log(this.statsEndpoint + "/distribution/" + period + "?" + queryString.stringify({ vehicleId }));
        return this.auth.fetch(this.statsEndpoint + "/distribution/" + period + "?" + queryString.stringify({ vehicleId }), {
            method: 'GET'
        }).then(response => {
            return Promise.resolve(response);
        });
    }
}
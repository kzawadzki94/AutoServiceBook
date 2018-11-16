import {
    API_CONFIG
} from '../../config/ApiConfig';
import AuthenticationService from '../authentication/AuthenticationService';

export default class VehiclesService {
    constructor(auth) {
        this.auth = auth || new AuthenticationService();
        this.vehiclesEndpoint = `${API_CONFIG["URL_BASE"]}/vehicles`;
        this.user_id = this.auth.getProfile().user_id;
    }

    getVehicles() {
        return this.auth.fetch(this.vehiclesEndpoint, {
            method: 'GET'
        }).then(response => {
            return Promise.resolve(response);
        });
    }

    deleteVehicle(id) {
        return this.auth.fetch(this.vehiclesEndpoint + '/' + id, {
            method: 'DELETE'
        }).then(response => {
            console.log(response);
            return Promise.resolve(response);
        });
    }
}
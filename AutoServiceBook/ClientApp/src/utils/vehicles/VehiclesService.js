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

    getVehicle(id) {
        return this.auth.fetch(this.vehiclesEndpoint + '/' + id, {
            method: 'GET'
        }).then(response => {
            return Promise.resolve(response);
        });
    }

    deleteVehicle(id) {
        return this.auth.fetch(this.vehiclesEndpoint + '/' + id, {
            method: 'DELETE'
        }).then(response => {
            return Promise.resolve(response);
        });
    }

    editVehicle(vehicle) {
        return this.auth.fetch(this.vehiclesEndpoint + '/' + vehicle.vehicleId, {
            method: 'PUT',
            body: JSON.stringify(vehicle)
        }).then(response => {
            return Promise.resolve(response);
        });
    }

    addVehicle(vehicle) {
        let v = Object.assign({}, vehicle);
        v.ownerId = this.user_id;
        return this.auth.fetch(this.vehiclesEndpoint, {
            method: 'POST',
            body: JSON.stringify(v)
        }).then(response => {
            return Promise.resolve(response);
        });
    }

    updateOdometerIfNeeded(id, newMileage) {
        if (!newMileage || newMileage === "" || newMileage === "0" || newMileage === 0) {
            return;
        }

        return this.getVehicle(id)
            .then(response => {
                if (parseInt(newMileage) >= parseInt(response.mileage)) {
                    let v = Object.assign({}, response);
                    v.mileage = newMileage;
                    return this.editVehicle(v);
                }
            });
    }
}
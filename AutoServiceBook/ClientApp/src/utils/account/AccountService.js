import {
    API_CONFIG
} from '../../config/ApiConfig';
import AuthenticationService from '../authentication/AuthenticationService';

export default class AccountService {
    constructor(auth) {
        this.auth = auth || new AuthenticationService();
        this.accountEndpoint = `${API_CONFIG["URL_BASE"]}/account`;
    }

    register(firstname, lastname, email, password) {
        return this.auth.fetch(this.accountEndpoint, {
            method: 'POST',
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                password
            })
        }).then(response => {
            return Promise.resolve(response);
        });
    }

    fetchInfo() {
        this.auth.fetch(this.accountEndpoint, {
            method: 'GET'
        }).then(response => {
            this.saveInfo(response);
            return Promise.resolve(response);
        });
    }

    saveInfo(info) {
        localStorage.setItem('user', JSON.stringify(info));
    }

    getInfo() {
        return JSON.parse(localStorage.getItem('user'));
    }

    destroyInfo() {
        localStorage.removeItem('user');
    }
}
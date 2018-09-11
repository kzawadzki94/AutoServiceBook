import {
    API_CONFIG
} from '../../config/ApiConfig';
import AuthenticationService from '../authentication/AuthenticationService';

export default class AccountService {
    constructor(auth) {
        this.domain = API_CONFIG["URL_BASE"];
        this.auth = auth || new AuthenticationService();
    }

    register(firstname, lastname, email, password) {
        return this.auth.fetch(`${this.domain}/account/register`, {
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
        this.auth.fetch(`${this.domain}/account`, {
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
import {
    API_CONFIG
} from '../../config/ApiConfig';
import AuthenticationService from '../authentication/AuthenticationService';

export default class AccountService {
    constructor(auth) {
        this.domain = API_CONFIG["URL_BASE"];
        this.auth = auth || new AuthenticationService();
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
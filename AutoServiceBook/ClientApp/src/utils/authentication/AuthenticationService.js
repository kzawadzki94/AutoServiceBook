import {
    API_CONFIG
} from '../../config/ApiConfig';
import decode from 'jwt-decode';

export default class AuthenticationService {
    constructor() {
        this.domain = API_CONFIG["URL_BASE"];
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login(email, password) {
        return this.fetch(`${this.domain}/token`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(response => {
            this.setToken(response.token);
            return Promise.resolve(response);
        });
    }

    isUserLoggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decodedToken = decode(token);
            if (decodedToken.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    setToken(authToken) {
        localStorage.setItem('authToken', authToken);
    }

    getToken() {
        return localStorage.getItem('authToken');
    }

    logout() {
        localStorage.removeItem('authToken');
    }

    getProfile() {
        return decode(this.getToken());
    }

    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.isUserLoggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }

        return fetch(url, {
                headers,
                ...options
            })
            .then(this.checkStatus)
            .then(response => response.json())
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}
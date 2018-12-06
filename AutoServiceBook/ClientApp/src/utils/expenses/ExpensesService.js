import {
    API_CONFIG
} from '../../config/ApiConfig';
import AuthenticationService from '../authentication/AuthenticationService';

export default class ExpensesService {
    constructor(auth) {
        this.auth = auth || new AuthenticationService();
        this.expensesEndpoint = `${API_CONFIG["URL_BASE"]}/expenses`;
        this.user_id = this.auth.getProfile().user_id;
    }

    getExpenses() {
        return this.auth.fetch(this.expensesEndpoint, {
            method: 'GET'
        }).then(response => {
            return Promise.resolve(response);
        });
    }

    deleteExpense(id) {
        return this.auth.fetch(this.expensesEndpoint + '/' + id, {
            method: 'DELETE'
        }).then(response => {
            return Promise.resolve(response);
        });
    }

    editExpense(expense) {
        return this.auth.fetch(this.expensesEndpoint + '/' + expense.expenseId, {
            method: 'PUT',
            body: JSON.stringify(expense)
        }).then(response => {
            return Promise.resolve(response);
        });
    }

    addExpense(expense) {
        let e = Object.assign({}, expense);
        e.ownerId = this.user_id;
        return this.auth.fetch(this.expensesEndpoint, {
            method: 'POST',
            body: JSON.stringify(e)
        }).then(response => {
            return Promise.resolve(response);
        });
    }

}
import React, { Component } from 'react';
import { Layout } from './components';
import { HomePage, LoginPage, LogoutPage, AccountPage, RegisterPage, VehiclesPage, ExpensesPage } from './pages';
import { PublicRoute, PrivateRoute } from 'react-router-with-props';
import AuthenticationService from './utils/authentication/AuthenticationService';

const Auth = new AuthenticationService();
export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <PublicRoute path='/login' authed={Auth.isUserLoggedIn()} redirectTo="/" component={LoginPage} />
        <PublicRoute path='/register' authed={Auth.isUserLoggedIn()} redirectTo="/" component={RegisterPage} />
        <PrivateRoute exact path="/" authed={false} redirectTo="/home" component={HomePage} />
        <PrivateRoute path="/home" authed={Auth.isUserLoggedIn()} redirectTo="/login" component={HomePage} />
        <PrivateRoute path="/logout" authed={Auth.isUserLoggedIn()} redirectTo="/login" component={LogoutPage} />
        <PrivateRoute path="/account" authed={Auth.isUserLoggedIn()} redirectTo="/login" component={AccountPage} />
        <PrivateRoute path="/vehicles" authed={Auth.isUserLoggedIn()} redirectTo="/login" component={VehiclesPage} />
        <PrivateRoute path="/expenses" authed={Auth.isUserLoggedIn()} redirectTo="/login" component={ExpensesPage} />
      </Layout>
    );
  }
}

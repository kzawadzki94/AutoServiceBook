import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { LogoutPage } from './pages/LogoutPage';
import { AccountPage } from './pages/AccountPage';
import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';
import AuthenticationService from './utils/authentication/AuthenticationService';

const Auth = new AuthenticationService();
export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <PrivateRoute exact path="/" authed={false} redirectTo="/home" component={HomePage} />
        <PrivateRoute path="/home" authed={Auth.isUserLoggedIn()} redirectTo="/login" component={HomePage} />
        <PublicRoute path='/login' authed={Auth.isUserLoggedIn()} redirectTo="/" component={LoginPage} />
        <PrivateRoute path="/logout" authed={Auth.isUserLoggedIn()} redirectTo="/login" component={LogoutPage} />
        <PrivateRoute path="/account" authed={Auth.isUserLoggedIn()} redirectTo="/login" component={AccountPage} />
      </Layout>
    );
  }
}

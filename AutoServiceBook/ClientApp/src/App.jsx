import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { LoginPage } from './pages/LoginPage';
import { LogoutPage } from './pages/LogoutPage';
import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';
import AuthenticationService from './utils/authentication/AuthenticationService';

const Auth = new AuthenticationService();
export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <PrivateRoute exact path="/" authed={Auth.isUserLoggedIn()} redirectTo="/login" component={Home} />
        <PublicRoute exact path='/login' authed={Auth.isUserLoggedIn()} redirectTo="/" component={LoginPage} />
        <PrivateRoute exact path="/logout" authed={Auth.isUserLoggedIn()} redirectTo="/login" component={LogoutPage} />
      </Layout>
    );
  }
}

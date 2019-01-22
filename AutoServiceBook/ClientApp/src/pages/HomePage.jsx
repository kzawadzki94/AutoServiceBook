import React, { Component } from 'react';
import AuthenticationService from '../utils/authentication/AuthenticationService';

export class HomePage extends Component {

    constructor() {
        super();
        this.auth = new AuthenticationService();
    }

    componentDidMount() {
    }

    render() {
    return (
      <div>

      </div>
    );
  }
}

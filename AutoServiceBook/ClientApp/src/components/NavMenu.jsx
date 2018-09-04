import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AuthenticationService from '../utils/authentication/AuthenticationService';

export class NavMenu extends Component {
  displayName = NavMenu.name

  constructor() {
    super();
    this.auth = new AuthenticationService();
  }

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}><Glyphicon glyph='wrench' /> AutoServiceBook</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <MenuLinks isLoggedIn={this.auth.isUserLoggedIn()} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function MenuLinks(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <AuthorizedMenuLinks />;
  }

  return <NotAuthorizedMenuLinks />
}

function AuthorizedMenuLinks() {
  return (
    <React.Fragment>
      <LinkContainer to={'/home'}>
        <NavItem>
          <Glyphicon glyph='home' /> Home
      </NavItem>
      </LinkContainer>
      <LinkContainer to={'/logout'}>
        <NavItem>
          <Glyphicon glyph='log-out' /> Logout
      </NavItem>
      </LinkContainer>
    </React.Fragment>
  );
}

function NotAuthorizedMenuLinks() {
  return (
    <React.Fragment>
      <LinkContainer to={'/register'}>
        <NavItem>
          <Glyphicon glyph='registration-mark' /> Register
      </NavItem>
      </LinkContainer>
      <LinkContainer to={'/login'}>
        <NavItem>
          <Glyphicon glyph='log-in' /> Login
      </NavItem>
      </LinkContainer>
    </React.Fragment>
  );
}

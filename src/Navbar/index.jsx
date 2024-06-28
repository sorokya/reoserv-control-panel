import { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import BsNavbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthContext } from '../AuthContext';
import LoginForm from './LoginForm';
import Profile from './Profile';

function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BsNavbar expand="lg" className="bg-body-tertiary">
      <Container>
        <LinkContainer to="/">
          <BsNavbar.Brand>
            <img
              src="/favicon-32.png"
              alt="Logo"
              className="d-inline-block align-text-top"
            />
            REOSERV Control Panel
          </BsNavbar.Brand>
        </LinkContainer>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mb-2 mb-lg-0">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/online-players">
              <Nav.Link>Online Players</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Top 100" id="basic-nav-dropdown">
              <LinkContainer to="/top-players">
                <NavDropdown.Item>Top 100 Players</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/top-guilds">
                <NavDropdown.Item>Top 100 Guilds</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
          {isAuthenticated ? <Profile /> : <LoginForm />}
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;

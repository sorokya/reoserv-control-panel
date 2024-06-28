import { useContext, useState, useEffect } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  FormControl,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import BsNavbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthContext } from './AuthContext';

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

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ username, password });
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <FormControl
        type="text"
        placeholder="Username"
        aria-label="Username"
        className="me-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormControl
        type="password"
        placeholder="********"
        aria-label="Password"
        className="me-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="outline-success" type="submit">
        Login
      </Button>
    </form>
  );
}

function Profile() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="mute" className="dropdown-trigger">
        <img
          src="/avatar.png"
          alt="Profile"
          className="rounded-circle"
          style={{ height: '24px', marginRight: '5px' }}
        />
        <span>{user.username}</span>
      </Dropdown.Toggle>
      <DropdownMenu>
        <DropdownItem onClick={logout}>Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Navbar;

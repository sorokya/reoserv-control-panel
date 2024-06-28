import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
} from 'react-bootstrap';

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
        <DropdownDivider />
        <DropdownItem onClick={logout}>Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Profile;

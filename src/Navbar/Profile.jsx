import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { CiLogout } from 'react-icons/ci';
import { MdManageAccounts } from 'react-icons/md';

import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { upperFirst } from '../utils/upperFirst';

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
        <span>{upperFirst(user.username)}</span>
      </Dropdown.Toggle>
      <DropdownMenu>
        <LinkContainer to="/account">
          <DropdownItem>
            <MdManageAccounts className="align-text-middle" />
            &nbsp; Manage Account
          </DropdownItem>
        </LinkContainer>
        <DropdownHeader>Characters</DropdownHeader>
        {user.characters.map((character) => (
          <LinkContainer to={`/characters/${character.id}`} key={character.id}>
            <DropdownItem>{upperFirst(character.name)}</DropdownItem>
          </LinkContainer>
        ))}
        <DropdownDivider />
        <DropdownItem onClick={logout}>
          <CiLogout className="align-text-middle" />
          &nbsp; Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Profile;

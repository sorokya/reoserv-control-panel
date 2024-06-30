import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { CiLogout } from 'react-icons/ci';
import { FaHammer, FaUsers } from 'react-icons/fa';
import { FaEarthAmericas } from 'react-icons/fa6';
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
  const { user, isAdmin, logout } = useContext(AuthContext);

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
            <MdManageAccounts />
            &nbsp; Account
          </DropdownItem>
        </LinkContainer>
        <DropdownHeader>Characters</DropdownHeader>
        {user.characters.map((character) => (
          <LinkContainer to={`/characters/${character.id}`} key={character.id}>
            <DropdownItem>{upperFirst(character.name)}</DropdownItem>
          </LinkContainer>
        ))}

        {isAdmin ? (
          <>
            <DropdownDivider />
            <DropdownHeader>Admin</DropdownHeader>
            <LinkContainer to="/bans">
              <DropdownItem>
                <FaHammer />
                &nbsp;Bans
              </DropdownItem>
            </LinkContainer>
            <LinkContainer to="/accounts">
              <DropdownItem>
                <FaUsers />
                &nbsp;Accounts
              </DropdownItem>
            </LinkContainer>
            <LinkContainer to="/characters">
              <DropdownItem>
                <FaUsers />
                &nbsp;Characters
              </DropdownItem>
            </LinkContainer>
            <LinkContainer to="/maps">
              <DropdownItem>
                <FaEarthAmericas />
                &nbsp;Maps
              </DropdownItem>
            </LinkContainer>
          </>
        ) : (
          ''
        )}
        <DropdownDivider />
        <DropdownItem onClick={logout}>
          <CiLogout />
          &nbsp; Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Profile;
